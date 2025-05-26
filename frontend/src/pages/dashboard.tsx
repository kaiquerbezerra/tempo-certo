import { useSearchParams } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  LucideProps,
  Snowflake,
  Sun,
} from "lucide-react";
import dayjs from "dayjs";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import * as React from "react";

const weatherStateIconLookup: {
  [code: number]: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
} = {
  113: Sun,
  116: CloudSun,
  119: Cloud,
  122: Cloud,
  143: CloudFog,
  176: CloudDrizzle,
  179: CloudSnow,
  182: CloudHail,
  185: CloudDrizzle,
  200: CloudLightning,
  227: CloudSnow,
  230: CloudSnow,
  248: CloudFog,
  260: CloudFog,
  263: CloudDrizzle,
  266: CloudDrizzle,
  281: CloudDrizzle,
  284: CloudDrizzle,
  293: CloudRain,
  296: CloudRain,
  299: CloudRain,
  302: CloudRain,
  305: CloudRain,
  308: CloudRain,
  311: CloudRain,
  314: CloudRain,
  317: CloudHail,
  320: CloudHail,
  323: CloudSnow,
  326: CloudSnow,
  329: CloudSnow,
  332: CloudSnow,
  335: CloudSnow,
  338: CloudSnow,
  350: Snowflake,
  353: CloudDrizzle,
  356: CloudRain,
  359: CloudRain,
  362: CloudHail,
  365: CloudHail,
  368: CloudSnow,
  371: CloudSnow,
  374: Snowflake,
  377: Snowflake,
  386: CloudLightning,
  389: CloudLightning,
  392: CloudLightning,
  395: CloudLightning,
};

type WeatherForecastData = {
  country: string;
  weatherState: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherPreview: {
    time: string;
    weatherState: number;
    temperature: number;
  }[];
  forecastPreview: {
    date: string;
    min: number;
    max: number;
    weatherState: number;
  }[];
  weatherSeries: {
    time: string;
    temperature: number;
  }[];
};

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location") || "";
  const startsAtParam = searchParams.get("startsAt");
  const endsAtParam = searchParams.get("endsAt");
  const isUsingFahrenheitParam = searchParams.get("isUsingFahrenheit");

  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastData | null>();

  useEffect(() => {
    const fetchWeatherForecastData = async () => {
      const response = await fetch(
        `http://localhost:8000/api/weather-forecast?${new URLSearchParams({
          location: locationParam,
          startsAt: startsAtParam
            ? dayjs(startsAtParam).toISOString()
            : dayjs().toISOString(),
          endsAt: endsAtParam
            ? dayjs(endsAtParam).toISOString()
            : dayjs().toISOString(),
          isUsingFahrenheit: isUsingFahrenheitParam
            ? isUsingFahrenheitParam
            : "false",
        }).toString()}`,
      );
      const data = await response.json();
      setWeatherForecastData(data);
    };

    fetchWeatherForecastData().then(() => {});
  }, [startsAtParam, endsAtParam, locationParam, isUsingFahrenheitParam]);

  if (!weatherForecastData) {
    return <div>Loading...</div>;
  }

  const WeatherStateIcon =
    weatherStateIconLookup[weatherForecastData.weatherState];

  return (
    <Grid flexGrow={1} container py={1} gap={8}>
      <Grid size={7} gap={4} container flexDirection="column">
        <Box sx={{ backgroundColor: "#EADDFF" }} p={4} borderRadius={7}>
          <Grid container direction="column" spacing={1}>
            <Grid container direction="row" justifyContent="space-between">
              {<WeatherStateIcon width={64} height={64} />}
              <Grid
                container
                justifyContent="start"
                direction="column"
                size={3}
                alignItems="start"
                spacing={1}
              >
                <Typography fontSize={24} fontWeight="medium">
                  {locationParam}
                </Typography>
                <Typography fontSize={14}>
                  {weatherForecastData.country}
                </Typography>
              </Grid>
              <Grid
                size={2}
                container
                justifyContent="start"
                direction="column"
                alignItems="start"
                spacing={1}
              >
                <Typography fontSize={24} fontWeight="medium">
                  {weatherForecastData.temperature}º
                </Typography>
                <Typography fontSize={14}>Temperatura</Typography>
              </Grid>
              <Grid
                size={2}
                container
                justifyContent="start"
                direction="column"
                alignItems="start"
                spacing={1}
              >
                <Typography fontSize={24} fontWeight="medium">
                  {weatherForecastData.humidity}%
                </Typography>
                <Typography fontSize={14}>Umidade</Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontSize={24} fontWeight="medium">
                  {weatherForecastData.windSpeed}km/h
                </Typography>
                <Typography fontSize={14}>Velocidade do vento</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between">
              {weatherForecastData.weatherPreview.map((item, index) => {
                const WeatherStateIcon =
                  weatherStateIconLookup[item.weatherState];
                return (
                  <Box
                    key={index}
                    sx={{ backgroundColor: "#FFD8E4" }}
                    borderRadius={5}
                    paddingX={2.1}
                    paddingY={1}
                  >
                    <Grid
                      container
                      direction="column"
                      spacing={2}
                      alignItems="center"
                    >
                      <Typography fontSize={10} fontWeight="bold">
                        {dayjs(item.time).format("hh a")}
                      </Typography>
                      <WeatherStateIcon fill="black" />
                      <Typography fontSize={10} fontWeight="bold">
                        {item.temperature}º
                      </Typography>
                    </Grid>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        </Box>

        <LineChart
          sx={{ flexGrow: 1 }}
          xAxis={[
            {
              scaleType: "time",
              data: weatherForecastData.weatherSeries.map(({ time }) =>
                dayjs(time),
              ),
              valueFormatter: (value) => dayjs(value).format("D - hh a"),
            },
          ]}
          yAxis={[
            {
              valueFormatter: (value: number) => `${value.toFixed(1)}º`,
            },
          ]}
          series={[
            {
              data: weatherForecastData.weatherSeries.map(
                ({ temperature }) => temperature,
              ),
              valueFormatter: (value) =>
                value !== null ? `${value.toFixed(1)}º` : "",
            },
          ]}
        />
      </Grid>
      <Grid container size={4} flexGrow={1}>
        <Box
          sx={{ backgroundColor: "#EADDFF" }}
          p={4}
          borderRadius={7}
          display="flex"
          flexDirection="column"
          gap={2}
          flexGrow={1}
        >
          <Typography fontSize={28}>Previsão para {locationParam}</Typography>
          {weatherForecastData.forecastPreview.map((item, index) => {
            const WeatherStateIcon = weatherStateIconLookup[item.weatherState];
            return (
              <Box
                key={index}
                sx={{ backgroundColor: "#FFFFFF" }}
                borderRadius={7}
                p={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <WeatherStateIcon fill="black" />
                  <Typography fontSize={20}>
                    {item.min}º / {item.max}º
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    {dayjs(item.date).format("D MMMM, ddd")}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}
