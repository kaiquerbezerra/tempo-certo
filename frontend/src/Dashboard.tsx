// src/Dashboard.tsx
import { useState } from 'react'
import {
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

export default function Dashboard() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, 'day'))
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().hour(12).minute(0))
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().hour(17).minute(0))
  const [search, setSearch] = useState('Birmingham')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Use theme's default background color */}
      <Box p={4} sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Top controls */}
        <Grid container spacing={2} alignItems="center">
          {/* Dates */}
          <Grid>
            {/* Paper components automatically use theme.palette.background.paper */}
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', gap: 1 }}>
              <DatePicker
                label="Data de início"
                value={startDate}
                onChange={setStartDate}
                // Use slotProps instead of renderInput
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
              <DatePicker
                label="Data de término"
                value={endDate}
                onChange={setEndDate}
                // Use slotProps instead of renderInput
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
          {/* Times */}
          <Grid>
            {/* Paper components automatically use theme.palette.background.paper */}
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', gap: 1 }}>
              <TimePicker
                label="Hora de início"
                value={startTime}
                onChange={setStartTime}
                // Use slotProps instead of renderInput
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon fontSize="small" />
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
                // Use slotProps instead of renderInput
                slotProps={{
                  textField: {
                    size: 'small',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
          {/* Search */}
          <Grid>
            {/* TextField inherits theme styles */}
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar cidade"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* Icon color can be customized via theme or sx prop */}
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* Action */}
          <Grid>
            {/* Button inherits theme styles (containedPrimary, borderRadius, textTransform) */}
            <Button variant="contained" size="medium">
              Analisar →
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
            frameBorder="0"
            style={{ border: 0 }}
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
