from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from datetime import datetime
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

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI"}

@app.get("/api/dashboard")
def dashboardInfo():
    return {"message": "Dashboard information"}

@app.get("/api/weather-forecast")
async def getWeather(
    city: str = Query(..., description="Nome da cidade alvo"),
    start_datetime: Optional[str] = Query(None, description="Data e hora de início (YYYY-MM-DD HH:MM)"),
    end_datetime: Optional[str] = Query(None, description="Data e hora de fim (YYYY-MM-DD HH:MM)")
):
    try:
        url = f"http://api.weatherapi.com/v1/forecast.json"
        params = {
            "key": WEATHERAPI_KEY,
            "q": city,
            "days": 7,
            "aqi": "no",
            "alerts": "no"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Erro ao acessar a WeatherAPI")
            
        data = response.json()
        
        daily_forecast = []
        for day in data["forecast"]["forecastday"]:
            daily_forecast.append({
                "date": day["date"],
                "max_temp_c": day["day"]["maxtemp_c"],
                "min_temp_c": day["day"]["mintemp_c"],
                "avg_temp_c": day["day"]["avgtemp_c"],
                "max_temp_f": day["day"]["maxtemp_f"],
                "min_temp_f": day["day"]["mintemp_f"],
                "avg_temp_f": day["day"]["avgtemp_f"],
                "humidity": day["day"]["avghumidity"],
                "wind_speed": day["day"]["maxwind_kph"],
                "condition": day["day"]["condition"]["text"],
                "icon": day["day"]["condition"]["icon"],
                "precipitation_mm": day["day"]["totalprecip_mm"],
                "chance_of_rain": day["day"]["daily_chance_of_rain"]
            })
        
        hourly_forecast = []
        for day in data["forecast"]["forecastday"]:
            for hour in day["hour"]:
                hourly_forecast.append({
                    "time": hour["time"],
                    "timestamp": hour["time_epoch"],
                    "temp_c": hour["temp_c"],
                    "temp_f": hour["temp_f"],
                    "temp_k": hour["temp_c"] + 273.15,
                    "feels_like_c": hour["feelslike_c"],
                    "feels_like_f": hour["feelslike_f"],
                    "feels_like_k": hour["feelslike_c"] + 273.15,
                    "humidity": hour["humidity"],
                    "wind_speed": hour["wind_kph"],
                    "wind_direction": hour["wind_dir"],
                    "condition": hour["condition"]["text"],
                    "icon": hour["condition"]["icon"],
                    "precipitation_mm": hour["precip_mm"],
                    "chance_of_rain": hour["chance_of_rain"]
                })
        
        highlighted_period = None
        if start_datetime and end_datetime:
            try:
                start_dt = datetime.strptime(start_datetime, "%Y-%m-%d %H:%M")
                end_dt = datetime.strptime(end_datetime, "%Y-%m-%d %H:%M")
                
                start_timestamp = int(start_dt.timestamp())
                end_timestamp = int(end_dt.timestamp())
                
                highlighted_period = [
                    hour for hour in hourly_forecast 
                    if start_timestamp <= hour["timestamp"] <= end_timestamp
                ]
            except ValueError:
                raise HTTPException(
                    status_code=400, 
                    detail="Formato de data inválido. Use YYYY-MM-DD HH:MM"
                )
        
        current_weather = {
            'pluviality': str(data["current"].get("precip_mm", "0")),
            'actual_temp_in_celsius': str(data["current"]["temp_c"]),
            'actual_temp_in_fahrenheit': str(data["current"]["temp_f"]),
            'actual_temp_in_kelvin': str(data["current"]["temp_c"] + 273.15),
            'feels_like_temp_in_celsius': str(data["current"]["feelslike_c"]),
            'feels_like_temp_in_fahrenheit': str(data["current"]["feelslike_f"]),
            'feels_like_temp_in_kelvin': str(data["current"]["feelslike_c"] + 273.15),
            'humidity': str(data["current"]["humidity"]),
            'wind_speed': str(data["current"]["wind_kph"]),
            'wind_direction': data["current"]["wind_dir"],
        }
        
        return {
            "location": data["location"],
            "current": current_weather,
            "daily_forecast": daily_forecast,
            "hourly_forecast": hourly_forecast,
            "highlighted_period": highlighted_period
        }
        
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Erro ao conectar à API de previsão: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
