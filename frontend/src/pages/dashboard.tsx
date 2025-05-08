import { useSearchParams } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import { CloudRain, CloudSun, Cloudy, Sun } from "lucide-react";
import dayjs from "dayjs";

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
      time: dayjs().add(i, "hour"),
      weatherState: Object.values(WeatherState)[Math.floor(Math.random() * 4)],
      temperature: Math.floor(Math.random() * 30),
    })),
  };

  const WeatherStateIcon = weatherStateIconLookup[weatherState];

  return (
    <Grid container justifyContent="space-between">
      <Grid size={7}>
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
      </Grid>
      <Grid size={4}>
        <Box
          sx={{ backgroundColor: "#EADDFF" }}
          p={4}
          borderRadius={7}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography fontSize={28}>Previsão para {locationParam}</Typography>
          <Box
            sx={{ backgroundColor: "#FFFFFF" }}
            borderRadius={7}
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Sun fill="black" />
              <Typography fontSize={20}>20º / 24º</Typography>
            </Box>
            <Box>
              <Typography>7 Abril, Seg</Typography>
            </Box>
          </Box>
          <Box
            sx={{ backgroundColor: "#FFFFFF" }}
            borderRadius={7}
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Sun fill="black" />
              <Typography fontSize={20}>20º / 24º</Typography>
            </Box>
            <Box>
              <Typography>7 Abril, Seg</Typography>
            </Box>
          </Box>
          <Box
            sx={{ backgroundColor: "#FFFFFF" }}
            borderRadius={7}
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Sun fill="black" />
              <Typography fontSize={20}>20º / 24º</Typography>
            </Box>
            <Box>
              <Typography>7 Abril, Seg</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
