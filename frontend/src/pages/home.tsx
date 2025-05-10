import { Box } from "@mui/material";
import { useSearchParams } from "react-router";

export function Home() {
  const [searchParams] = useSearchParams();
  return (
    <Box borderRadius={2} flexGrow={1}>
      <iframe
        title="map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          searchParams.get("location") ?? "",
        )}&output=embed`}
        allowFullScreen
      />
    </Box>
  );
}
