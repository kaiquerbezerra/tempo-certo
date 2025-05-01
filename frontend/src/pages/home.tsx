import {Box} from "@mui/material";
import {useSearchParams} from "react-router";

export function Home() {
    const [searchParams] = useSearchParams()
    return (
        <Box mt={4} height={500} borderRadius={2} overflow="hidden" boxShadow={1}>
            <iframe
                title="map"
                width="100%"
                height="100%"
                style={{border: 0}}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                    searchParams.get('location') ?? ''
                )}&output=embed`}
                allowFullScreen
            />
        </Box>
    )
}