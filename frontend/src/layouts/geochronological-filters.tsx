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

export function GeochronologicalFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationObject = useLocation();
  const startsAtParam = searchParams.get("startsAt");
  const startsAt = startsAtParam ? new Date(startsAtParam) : null;
  const endsAtParam = searchParams.get("endsAt");
  const endsAt = endsAtParam ? new Date(endsAtParam) : null;

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
          <Grid container spacing={2} justifyItems="center" direction="column">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="start"
                size={11}
              >
                <Grid size={4}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, display: "flex", gap: 1 }}
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
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
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
                            .millisecond(0)
                            .toISOString(),
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                <Grid size={4}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, display: "flex", gap: 1 }}
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
                            .second(0)
                            .millisecond(0)
                            .toISOString(),
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
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
                            .millisecond(0)
                            .toISOString(),
                        );
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                <Grid>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, display: "flex", gap: 1 }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Buscar cidade"
                      value={location}
                      onChange={(e) => {
                        e.preventDefault();
                        setLocation(e.target.value);
                        setSearchParamDebounced("location", e.target.value);
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Paper>
                </Grid>
                {locationObject.pathname === "/" ? (
                  <Grid
                    container
                    justifyContent="start"
                    direction="row"
                    size={2}
                  >
                    <Link to={`/dashboard?${dashboardQueryParams.toString()}`}>
                      <Button
                        variant="contained"
                        size="medium"
                        endIcon={<ArrowRightAlt />}
                      >
                        Analisar
                      </Button>
                    </Link>
                  </Grid>
                ) : null}
              </Grid>
              {locationObject.pathname === "/dashboard" ? (
                <Grid size={1}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, display: "flex", gap: 1 }}
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
              ) : null}
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
