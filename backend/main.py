from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI"}

@app.get("/api/dashboard")
def dashboardInfo():
    return {"message": "Dashboard information"}


@app.get("/api/location-weather")
def getWeather():
    return {
        "weatherObject": {
            'pluviality': '120',
            'actual_temp_in_celsius': '30',
            'actual_temp_in_fahrenheit': '86',
            'actual_temp_in_kelvin': '303.15',
            'feels_like_temp_in_celsius': '32',
            'feels_like_temp_in_fahrenheit': '89.6',
            'feels_like_temp_in_kelvin': '305.15',
            'humidity': '60',
            'wind_speed': '10',
            'wind_direction': 'N',
        }
    }


