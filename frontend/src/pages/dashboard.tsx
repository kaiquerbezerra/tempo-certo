import { useSearchParams } from "react-router";
import { Box, Grid } from "@mui/material";

export function Dashboard() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const startsAt = searchParams.get("startsAt");
  const endsAt = searchParams.get("endsAt");

  return (
    <Grid container justifyContent="space-between">
      <Grid size={7}>
        <Box sx={{ backgroundColor: "#EADDFF" }}>
          <h1>{location}</h1>
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
