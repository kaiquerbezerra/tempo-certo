import {Box, Button, Grid, InputAdornment, Paper, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {useState} from "react";
import {Dayjs} from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import {Link, Outlet, useLocation, useSearchParams} from "react-router";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import lodash from 'lodash';

export function GeochronologicalFilters() {
    const [searchParams, setSearchParams] = useSearchParams()
    const locationObject = useLocation()

    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [startTime, setStartTime] = useState<Dayjs | null>(null)
    const [endTime, setEndTime] = useState<Dayjs | null>(null)
    const [location, setLocation] = useState<string>(searchParams.get('location') ?? '');

    const dashboardQueryParams = new URLSearchParams({
        location,
        startsAt: (startDate && startTime) ? new Date(startDate.year(), startDate.month(), startDate.date(), startTime.hour(), startTime.minute(), startTime.second(), startTime.millisecond()).toISOString() : '',
        endsAt: (endDate && endTime) ? new Date(endDate.year(), endDate.month(), endDate.date(), endTime.hour(), endTime.minute(), endTime.second(), endTime.millisecond()).toISOString() : '',
    })


    const setSearchParamDebounced = lodash.debounce((key: string, value: string) => setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
    }), 750)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Box p={4}>
                <Grid container spacing={2} alignItems="center" direction="column">
                    <Grid container sx={{width: '100%'}} direction="row" justifyContent="space-between">
                        <Grid>
                            <Paper variant="outlined" sx={{p: 2, display: 'flex', gap: 1}}>
                                <DatePicker
                                    label="Data de início"
                                    value={startDate}
                                    onChange={setStartDate}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <CalendarTodayIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }
                                    }}
                                />
                                <TimePicker
                                    label="Hora de início"
                                    value={startTime}
                                    onChange={setStartTime}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AccessTimeIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid>
                            <Paper variant="outlined" sx={{p: 2, display: 'flex', gap: 1}}>
                                <DatePicker
                                    label="Data de término"
                                    value={endDate}
                                    onChange={setEndDate}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <CalendarTodayIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }
                                    }}
                                />
                                <TimePicker
                                    label="Hora de término"
                                    value={endTime}
                                    onChange={setEndTime}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            InputProps: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AccessTimeIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                            }
                                        }
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid>
                            <Paper variant="outlined" sx={{p: 2, display: 'flex', gap: 1}}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Buscar cidade"
                                    value={location}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setLocation(e.target.value)
                                        setSearchParamDebounced('location', e.target.value)
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small"/>
                                                </InputAdornment>
                                            ),
                                        }
                                    }}/>
                            </Paper>
                        </Grid>
                        {
                            locationObject.pathname === '/' ? (
                                <Grid container sx={{width: '100%'}} justifyContent="end" direction="row">
                                    <Link to={`/dashboard?${dashboardQueryParams.toString()}`}>
                                        <Button variant="contained" size="medium"
                                                endIcon={<ArrowRightAlt/>}>
                                            Analisar
                                        </Button>
                                    </Link>
                                </Grid>
                            ) : null
                        }
                    </Grid>
                </Grid>
                <Outlet/>
            </Box>
        </LocalizationProvider>
    )
}