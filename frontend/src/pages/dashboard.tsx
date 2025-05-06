import { useSearchParams } from "react-router";
import { Box, Grid, Typography } from "@mui/material";
import { CloudRain, CloudSun } from "lucide-react";

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");

  return (
    <Grid container justifyContent="space-between">
      <Grid size={7}>
        <Box sx={{ backgroundColor: "#EADDFF" }} p={4} borderRadius={7}>
          <Grid container direction="column" spacing={2}>
            <Grid container direction="row" justifyContent="space-between">
              <CloudSun style={{ width: "64px", height: "64px" }} />
              <Grid
                container
                justifyContent="start"
                direction="column"
                size={3}
                alignItems="start"
                spacing={1}
              >
                <Typography fontSize={24} fontWeight="medium">
                  Bermingham
                </Typography>
                <Typography fontSize={14}>Inglaterra</Typography>
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
                  20º
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
                  24%
                </Typography>
                <Typography fontSize={14}>Umidade</Typography>
              </Grid>
              <Grid size={3}>
                <Typography fontSize={24} fontWeight="medium">
                  13km/h
                </Typography>
                <Typography fontSize={14}>Velocidade do vento</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              {Array.from({ length: 10 }).map(() => (
                <Box
                  sx={{ backgroundColor: "#FFD8E4" }}
                  borderRadius={5}
                  paddingX={2.2}
                  paddingY={1}
                >
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    alignItems="center"
                  >
                    <Typography fontSize={10} fontWeight="bold">
                      10 am
                    </Typography>
                    <CloudRain fill="black" />
                    <Typography fontSize={10} fontWeight="bold">
                      20º
                    </Typography>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid size={4}>
        <Box sx={{ backgroundColor: "#EADDFF" }}>
          <h1>Previsão para {location}</h1>
        </Box>
      </Grid>
    </Grid>
  );
}
