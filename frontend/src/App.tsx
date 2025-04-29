import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import IconsPage from './IconsPage'
import './App.css'

function App() {
  // Create a custom theme (you can customize this further as your project grows)
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconsPage />
    </ThemeProvider>
  )
}

export default App
