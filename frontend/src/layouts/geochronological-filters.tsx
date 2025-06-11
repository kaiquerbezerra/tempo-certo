import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Link, Outlet, useLocation, useSearchParams } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import lodash from "lodash";
import { TemperatureUnitSwitch } from "../components/temperature-unit-switch.ts";
import { useNavigate } from "react-router";

export function GeochronologicalFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationObject = useLocation();
  const startsAtParam = searchParams.get("startsAt");
  const startsAt = startsAtParam ? new Date(startsAtParam) : null;
  const endsAtParam = searchParams.get("endsAt");
  const endsAt = endsAtParam ? new Date(endsAtParam) : null;
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Dayjs | null>(
    startsAt
      ? dayjs()
          .year(startsAt.getFullYear())
          .month(startsAt.getMonth())
          .date(startsAt.getDate())
      : dayjs(),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    endsAt &&
      dayjs()
        .year(endsAt.getFullYear())
        .month(endsAt.getMonth())
        .date(endsAt.getDate()),
  );
  const [startTime, setStartTime] = useState<Dayjs | null>(
    startsAt
      ? dayjs()
          .hour(startsAt.getHours())
          .minute(startsAt.getMinutes())
          .second(startsAt.getSeconds())
      : dayjs(),
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(
    endsAt &&
      dayjs()
        .hour(endsAt.getHours())
        .minute(endsAt.getMinutes())
        .second(endsAt.getSeconds()),
  );

  const [location, setLocation] = useState<string>(
    searchParams.get("location") ?? "",
  );

  const [isUsingFahrenheit, setIsUsingFahrenheit] = useState<boolean>(
    searchParams.get("isUsingFahrenheit")
      ? searchParams.get("isUsingFahrenheit") === "true"
      : false,
  );

  const dashboardQueryParams = new URLSearchParams({
    location,
    startsAt:
      startDate && startTime
        ? new Date(
            startDate.year(),
            startDate.month(),
            startDate.date(),
            startTime.hour(),
            startTime.minute(),
            startTime.second(),
            startTime.millisecond(),
          ).toISOString()
        : "",
    endsAt:
      endDate && endTime
        ? new Date(
            endDate.year(),
            endDate.month(),
            endDate.date(),
            endTime.hour(),
            endTime.minute(),
            endTime.second(),
            endTime.millisecond(),
          ).toISOString()
        : "",
  });

  const setSearchParamDebounced = useCallback(
    lodash.debounce(
      (key: string, value: string) =>
        setSearchParams((prev) => {
          prev.set(key, value);
          return prev;
        }),
      750,
    ),
    [searchParams],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
  <Box display="flex" flexDirection="column" height="100dvh" gap={2} py={1}>
    <Box px={4}>
      <Grid container spacing={2} direction="column">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                display: "flex",
                gap: 1,
                borderRadius: 3,
              }}
            >
              <DatePicker
                label="Data de início"
                value={startDate}
                onChange={(value) => {
                  setStartDate(value);
                  setSearchParamDebounced(
                    "startsAt",
                    value!
                      .hour(startTime!.hour())
                      .minute(startTime!.minute())
                      .toISOString(),
                  );
                }}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
              <TimePicker
                label="Hora de início"
                value={startTime}
                onChange={(value) => {
                  setStartTime(value);
                  setSearchParamDebounced(
                    "startsAt",
                    value!
                      .date(startDate!.date())
                      .month(startDate!.month())
                      .year(startDate!.year())
                      .toISOString(),
                  );
                }}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                display: "flex",
                gap: 1,
                borderRadius: 3,
              }}
            >
              <DatePicker
                label="Data de término"
                value={endDate}
                onChange={(value) => {
                  setEndDate(value);
                  setSearchParamDebounced(
                    "endsAt",
                    value!
                      .hour(endTime!.hour())
                      .minute(endTime!.minute())
                      .toISOString(),
                  );
                }}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
              <TimePicker
                label="Hora de término"
                value={endTime}
                onChange={(value) => {
                  setEndTime(value);
                  setSearchParamDebounced(
                    "endsAt",
                    value!
                      .date(endDate!.date())
                      .month(endDate!.month())
                      .year(endDate!.year())
                      .toISOString(),
                  );
                }}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 3,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar cidade"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setSearchParamDebounced("location", e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Grid>

          {locationObject.pathname === "/" && (
            <Grid item xs={12} md={1}>
              <Link to={`/dashboard?${dashboardQueryParams.toString()}`}>
                <Button
                  variant="contained"
                  size="medium"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    textTransform: "none",
                  }}
                  endIcon={<ArrowRightAlt />}
                >
                  Analisar
                </Button>
              </Link>
            </Grid>
          )}

          {locationObject.pathname === "/dashboard" && (
          <>
            <Grid item xs={12} md={1}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: 3,
                }}
              >
                <TemperatureUnitSwitch
                  checked={isUsingFahrenheit}
                  onChange={() => {
                    setIsUsingFahrenheit((prev) => !prev);
                    setSearchParams((prev) => {
                      prev.set(
                        "isUsingFahrenheit",
                        String(!(prev.get("isUsingFahrenheit") === "true")),
                      );
                      return prev;
                    });
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md="auto">
              <Button
                variant="contained"
                size="medium"
                startIcon={<ArrowRightAlt />}
                onClick={() => navigate("/")}
                sx={{
                    borderRadius: 3,
                    height: "100%",
                    textTransform: "none",
                  }}
              >
                Voltar para Home
              </Button>
            </Grid>
          </>
        )}
        </Grid>
      </Grid>
    </Box>

    <Box display="flex" flexGrow={1} px={4}>
      <Outlet />
    </Box>
  </Box>
</LocalizationProvider>

  );
}
