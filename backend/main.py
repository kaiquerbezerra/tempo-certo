from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHERAPI_KEY = os.getenv("WEATHERAPI_KEY")
if not WEATHERAPI_KEY:
    raise ValueError("WEATHERAPI_KEY não encontrada nas variáveis de ambiente")

WEATHER_ICON_MAPPING = {
    "Sunny": 113,
    "Clear": 113,
    "Partly Cloudy": 116,
    "Cloudy": 119,
    "Overcast": 122,
    "Mist": 143,
    "Patchy rain nearby": 176,
    "Patchy snow nearby": 179,
    "Patchy sleet nearby": 182,
    "Patchy freezing drizzle nearby": 185,
    "Thundery outbreaks in nearby": 200,
    "Blowing snow": 227,
    "Blizzard": 230,
    "Fog": 248,
    "Freezing fog": 260,
    "Patchy light drizzle": 263,
    "Light drizzle": 266,
    "Freezing drizzle": 281,
    "Heavy freezing drizzle": 284,
    "Patchy light rain": 293,
    "Light rain": 296,
    "Moderate rain at times": 299,
    "Moderate rain": 302,
    "Heavy rain at times": 305,
    "Heavy rain": 308,
    "Light freezing rain": 311,
    "Moderate or heavy freezing rain": 314,
    "Light sleet": 317,
    "Moderate or heavy sleet": 320,
    "Patchy light snow": 323,
    "Light snow": 326,
    "Patchy moderate snow": 329,
    "Moderate snow": 332,
    "Patchy heavy snow": 335,
    "Heavy snow": 338,
    "Ice pellets": 350,
    "Light rain shower": 353,
    "Moderate or heavy rain shower": 356,
    "Torrential rain shower": 359,
    "Light sleet showers": 362,
    "Moderate or heavy sleet showers": 365,
    "Light snow showers": 368,
    "Moderate or heavy snow showers": 371,
    "Light showers of ice pellets": 374,
    "Moderate or heavy showers of ice pellets": 377,
    "Patchy light rain in area with thunder": 386,
    "Moderate or heavy rain in area with thunder": 389,
    "Patchy light snow in area with thunder": 392,
    "Moderate or heavy snow in area with thunder": 395
}

def map_weather_state(condition: str) -> int:
    return WEATHER_ICON_MAPPING.get(condition, 0)  # 0 = Desconhecido

@app.get("/api/weather-forecast")
async def get_weather_forecast(
    location: str = Query(..., description="Nome da cidade alvo"),
    startsAt: datetime = Query(..., description="Data e hora de início (YYYY-MM-DD HH:MM)"),
    endsAt: datetime = Query(..., description="Data e hora de fim (YYYY-MM-DD HH:MM)"),
    isUsingFahrenheit: bool = Query(False, description="Define a unidade de temperatura")
):
    try:
        try:
            now = datetime.now().date()
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "ParseError",
                    "message": "Formato de data inválido.",
                    "field": "startsAt or endsAt"
                }
            )

        if endsAt < startsAt:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "ValidationError",
                    "message": "A data final deve ser maior que startsAt",
                    "field": "endsAt"
                }
            )

        if startsAt.date() < now:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "ValidationError",
                    "message": "A data inicial não pode ser anterior ao dia de hoje",
                    "field": "startsAt"
                }
            )

        if endsAt.date() > now + timedelta(days=14):
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "ValidationError",
                    "message": "A data final não pode ser superior a 14 dias após a dia de hoje",
                    "field": "endsAt"
                }
            )

        url = f"http://api.weatherapi.com/v1/forecast.json"
        params = {
            "key": WEATHERAPI_KEY,
            "q": location,
            "days": 14,
            "aqi": "no",
            "alerts": "no"
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Erro ao acessar a WeatherAPI")

        data = response.json()

        unit = "f" if isUsingFahrenheit else "c"

        current = data["current"]
        current_weather = {
            "country": data["location"]["country"],
            "weatherState": map_weather_state(current["condition"]["text"].strip()),
            "temperature": current[f"temp_{unit}"],
            "humidity": current["humidity"],
            "windSpeed": current["wind_kph"],
        }

        hourly_data = []
        for day in data["forecast"]["forecastday"]:
            for hour in day["hour"]:
                hour_dt = datetime.strptime(hour["time"], "%Y-%m-%d %H:%M")
                hourly_data.append({
                    "time": hour_dt.isoformat(),
                    "weatherState": map_weather_state(hour["condition"]["text"].strip()),
                    "temperature": hour[f"temp_{unit}"],
                    "timestamp": hour["time_epoch"]
                })

        hourly_data.sort(key=lambda x: x["timestamp"])
        highlighted_hours = [
            h for h in hourly_data
            if startsAt.timestamp() <= h["timestamp"] <= endsAt.timestamp()
        ]

        if len(highlighted_hours) < 10:
            next_items = [
                h for h in hourly_data
                if h["timestamp"] > endsAt.timestamp()
            ]
            to_add = next_items[:10 - len(highlighted_hours)]
            highlighted_hours.extend(to_add)

        forecast_days = data["forecast"]["forecastday"]

        days_in_range = [
            day for day in forecast_days 
            if startsAt.date() <= datetime.strptime(day["date"], "%Y-%m-%d").date() <= endsAt.date()
        ]
        
        if len(days_in_range) < 8:
            days_after = [
                day for day in forecast_days 
                if datetime.strptime(day["date"], "%Y-%m-%d").date() > endsAt.date()
            ]
            
            days_before = [
                day for day in forecast_days 
                if datetime.strptime(day["date"], "%Y-%m-%d").date() < startsAt.date()
            ]
            
            days_to_add_after = days_after[:8 - len(days_in_range)]
            days_in_range.extend(days_to_add_after)
            
            if len(days_in_range) < 8:
                days_to_add_before = days_before[-(8 - len(days_in_range)):]
                days_in_range = days_to_add_before + days_in_range
        
        days_in_range.sort(key=lambda day: datetime.strptime(day["date"], "%Y-%m-%d").date())

        forecastPreview = []
        for day in days_in_range:
            forecastPreview.append({
                "date": datetime.strptime(day["date"], "%Y-%m-%d").date().isoformat(),
                "min": day["day"][f"mintemp_{unit}"],
                "max": day["day"][f"maxtemp_{unit}"],
                "weatherState": map_weather_state(day["day"]["condition"]["text"].strip())
            })

        return {
            **current_weather,
            "weatherPreview": highlighted_hours[:10],
            "forecastPreview": forecastPreview,
            "weatherSeries": [
                {"time": h["time"], "temperature": h["temperature"]}
                for h in highlighted_hours
            ]
        }

    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Erro ao conectar à API de previsão: {str(e)}")

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno no servidor: {str(e)}")
