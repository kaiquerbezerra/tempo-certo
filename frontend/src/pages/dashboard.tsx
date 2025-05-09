import { useSearchParams } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import { CloudRain, CloudSun, Cloudy, Sun } from "lucide-react";
import dayjs from "dayjs";
import { LineChart } from "@mui/x-charts";

enum WeatherState {
  PartlyCloudy = "partly-cloudy",
  Cloudy = "cloudy",
  Rainy = "rainy",
  Sunny = "sunny",
}

const weatherStateIconLookup = {
  [WeatherState.PartlyCloudy]: CloudSun,
  [WeatherState.Cloudy]: Cloudy,
  [WeatherState.Rainy]: CloudRain,
  [WeatherState.Sunny]: Sun,
};

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location");
  const startsAtParam = searchParams.get("startsAt");
  const endsAtParam = searchParams.get("endsAt");
  const startsAt = startsAtParam ? dayjs(startsAtParam) : null;
  const endsAt = endsAtParam ? dayjs(endsAtParam) : null;

  const {
    location,
    temperature,
    humidity,
    windSpeed,
    weatherState,
    weatherPreview,
  } = {
    weatherState: Object.values(WeatherState)[Math.floor(Math.random() * 4)],
    location: {
      name: locationParam!,
      country: "Inglaterra",
    },
    temperature: 20,
    humidity: 24,
    windSpeed: 13,
    weatherPreview: Array.from({ length: 10 }).map((_, i) => ({
      time: startsAt!.add(i, "hour"),
      weatherState: Object.values(WeatherState)[Math.floor(Math.random() * 4)],
      temperature: Math.floor(Math.random() * 30),
    })),
  };

  const WeatherStateIcon = weatherStateIconLookup[weatherState];

  const daysDiff = (startsAt && endsAt?.diff(startsAt, "day")) || 0;
  const daysDiffFromEight = Math.floor(8 - daysDiff);
  const moreThanEightDays = daysDiffFromEight < 0;
  const daysToAdd = moreThanEightDays ? 0 : daysDiffFromEight;

  const filtersDaysSeries =
    startsAt &&
    endsAt &&
    Array.from({ length: daysDiff + 1 }).map((_, i) => startsAt.add(i, "day"));
  const complementaryDaysSeries =
    startsAt &&
    endsAt &&
    Array.from({ length: daysToAdd - 1 })
      .map((_, i) => startsAt.subtract(i + 1, "day"))
      .reverse();
  const daysSeries =
    startsAt && endsAt && complementaryDaysSeries!.concat(filtersDaysSeries!);
  const forecastSeries =
    daysSeries &&
    daysSeries.map((item) => ({
      date: item,
      min: Math.floor(Math.random() * 30),
      max: Math.floor(Math.random() * 30),
      weatherState: Object.values(WeatherState)[Math.floor(Math.random() * 4)],
    }));

  const hoursDiff = (startsAt && endsAt?.diff(startsAt, "hour")) || 0;
  const hoursDiffFromTen = Math.floor(10 - hoursDiff);
  const moreThanTenHours = hoursDiffFromTen < 0;
  const hoursToAdd = moreThanTenHours ? 0 : hoursDiffFromTen;

  const filtersHoursSeries =
    startsAt &&
    endsAt &&
    Array.from({ length: hoursDiff + 1 }).map((_, i) =>
      startsAt.add(i, "hour"),
    );
  const complementaryHoursSeries =
    startsAt &&
    endsAt &&
    Array.from({ length: hoursToAdd - 1 })
      .map((_, i) => startsAt.subtract(i + 1, "hour"))
      .reverse();
  const hoursSeries =
    startsAt && endsAt && complementaryHoursSeries!.concat(filtersHoursSeries!);
  const weatherSeries =
    hoursSeries &&
    Array.from({ length: hoursSeries.length }).map(() => Math.random() * 30);

  return (
    <Grid flexGrow={1} container py={1} gap={8}>
      <Grid size={7} gap={4} container>
        <Box sx={{ backgroundColor: "#EADDFF" }} p={4} borderRadius={7}>
          <Grid container direction="column" spacing={2}>
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
                  {location.name}
                </Typography>
                <Typography fontSize={14}>{location.country}</Typography>
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
                  {temperature}º
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
                  {humidity}%
                </Typography>
                <Typography fontSize={14}>Umidade</Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontSize={24} fontWeight="medium">
                  {windSpeed}km/h
                </Typography>
                <Typography fontSize={14}>Velocidade do vento</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              {weatherPreview.map((item, index) => {
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
                        {item.time.format("hh a")}
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
        {hoursSeries && weatherSeries && (
          <LineChart
            sx={{ flexGrow: 1 }}
            xAxis={[
              {
                scaleType: "time",
                data: hoursSeries,
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
                data: weatherSeries,
                valueFormatter: (value) =>
                  value !== null ? `${value.toFixed(1)}º` : "",
              },
            ]}
          />
        )}
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
          {forecastSeries?.map((item, index) => {
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
                  <Typography>{item.date.format("D MMMM, ddd")}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}
