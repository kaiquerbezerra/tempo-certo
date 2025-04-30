import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  // Create a custom theme with a light, pleasant palette
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#64b5f6', // Light Blue
        light: '#9be7ff',
        dark: '#2286c3',
      },
      secondary: {
        main: '#4dd0e1', // Cyan / Teal
        light: '#88ffff',
        dark: '#009faf',
      },
      background: {
        default: '#f5f7fa', // Very light grey/blue
        paper: '#ffffff',   // White for paper elements like cards/pickers
      },
      text: {
        primary: '#333333', // Dark grey for primary text
        secondary: '#5f6368', // Slightly lighter grey for secondary text
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 500 },
      h2: { fontSize: '2rem', fontWeight: 500 },
      h3: { fontSize: '1.75rem', fontWeight: 500 },
      // Add other typography variants if needed
    },
    components: {
      // Example: Customize Button appearance
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Slightly more rounded buttons
            textTransform: 'none', // Keep button text case as defined
          },
          containedPrimary: {
            color: '#ffffff', // Ensure text is white on primary buttons
          },
        },
      },
      // Example: Customize Paper appearance
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Consistent border radius for paper elements
          },
          outlined: {
             borderColor: '#e0e0e0', // Lighter border for outlined paper
          }
        }
      },
      // Example: Customize TextField appearance
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8, // Match button/paper border radius
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures background color is applied and provides baseline styles */}
      <Dashboard />
    </ThemeProvider>
  )
}

export default App