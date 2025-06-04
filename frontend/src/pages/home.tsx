import { Box, Container, Paper } from "@mui/material";
import { useSearchParams } from "react-router";

export function Home() {
  const [searchParams] = useSearchParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          height: "80vh",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <iframe
          title="map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            searchParams.get("location") ?? "",
          )}&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Paper>
    </Container>
  );
}
