import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Box, Button, Grid, InputAdornment, Paper, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SearchIcon from '@mui/icons-material/Search'
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt'
import {TimePicker} from '@mui/x-date-pickers/TimePicker'

export function Home() {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, 'day'))
    const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().hour(12).minute(0))
    const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().hour(17).minute(0))
    const [search, setSearch] = useState('Birmingham')

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
                                            },
                                        },
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
                                            },
                                        },
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
                                            },
                                        },
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
                                            },
                                        },
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
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {/* Icon color can be customized via theme or sx prop */}
                                                    <SearchIcon/>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container sx={{width: '100%'}} justifyContent="end" direction="row">
                        <Button variant="contained" size="medium" endIcon={<ArrowRightAlt/>}>
                            Analisar
                        </Button>
                    </Grid>
                </Grid>

                {/* Map */}
                {/* Container Box uses theme's shadow and borderRadius */}
                <Box mt={4} height={500} borderRadius={2} overflow="hidden" boxShadow={1}>
                    <iframe
                        title="map"
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            search
                        )}&output=embed`}
                        allowFullScreen
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}