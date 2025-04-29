import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Container, 
  Divider,
  TextField,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';

// Import various Material UI icons
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  CalendarMonth as CalendarMonthIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  CloudUpload as CloudUploadIcon,
  AttachFile as AttachFileIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

// Icon category type
type IconCategory = {
  title: string;
  icons: {
    icon: React.ReactNode;
    name: string;
  }[];
};

const IconsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from FastAPI backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hello');
        setApiResponse(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data from API:', err);
        setError('Failed to connect to the backend API. Make sure your FastAPI server is running on http://localhost:8000');
      }
    };

    fetchData();
  }, []);

  // Define icon categories
  const iconCategories: IconCategory[] = [
    {
      title: 'Navigation',
      icons: [
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <DashboardIcon />, name: 'Dashboard' },
        { icon: <MenuIcon />, name: 'Menu' },
        { icon: <SettingsIcon />, name: 'Settings' },
      ]
    },
    {
      title: 'User',
      icons: [
        { icon: <PersonIcon />, name: 'Person' },
        { icon: <GroupIcon />, name: 'Group' },
        { icon: <AccountCircleIcon />, name: 'AccountCircle' },
      ]
    },
    {
      title: 'Actions',
      icons: [
        { icon: <AddIcon />, name: 'Add' },
        { icon: <EditIcon />, name: 'Edit' },
        { icon: <DeleteIcon />, name: 'Delete' },
        { icon: <SearchIcon />, name: 'Search' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
      ]
    },
    {
      title: 'Communication',
      icons: [
        { icon: <EmailIcon />, name: 'Email' },
        { icon: <NotificationsIcon />, name: 'Notifications' },
        { icon: <PhoneIcon />, name: 'Phone' },
      ]
    },
    {
      title: 'Date & Time',
      icons: [
        { icon: <ScheduleIcon />, name: 'Schedule' },
        { icon: <CalendarMonthIcon />, name: 'CalendarMonth' },
      ]
    },
    {
      title: 'Status',
      icons: [
        { icon: <CheckCircleIcon color="success" />, name: 'CheckCircle' },
        { icon: <ErrorIcon color="error" />, name: 'Error' },
        { icon: <WarningIcon color="warning" />, name: 'Warning' },
        { icon: <InfoIcon color="info" />, name: 'Info' },
      ]
    },
    {
      title: 'Miscellaneous',
      icons: [
        { icon: <StarIcon />, name: 'Star' },
        { icon: <FavoriteIcon />, name: 'Favorite' },
        { icon: <CloudUploadIcon />, name: 'CloudUpload' },
        { icon: <AttachFileIcon />, name: 'AttachFile' },
        { icon: <VisibilityIcon />, name: 'Visibility' },
        { icon: <VisibilityOffIcon />, name: 'VisibilityOff' },
      ]
    },
  ];

  // Filter icons based on search term
  const filteredIconCategories = searchTerm
    ? iconCategories.map(category => ({
        title: category.title,
        icons: category.icons.filter(icon => 
          icon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.icons.length > 0)
    : iconCategories;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Material UI Icons Library
      </Typography>
      
      {/* API Response Display */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Backend API Connection:
        </Typography>
        
        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : apiResponse ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Connected to FastAPI backend! Response: {apiResponse.message}
          </Alert>
        ) : (
          <Alert severity="info" sx={{ mb: 2 }}>
            Connecting to FastAPI backend...
          </Alert>
        )}
        
        <Typography variant="caption" display="block" color="text.secondary">
          Endpoint: http://localhost:8000/api/hello
        </Typography>
      </Paper>
      
      <TextField
        fullWidth
        variant="outlined"
        label="Search icons"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          endAdornment: <SearchIcon color="action" />
        }}
      />

      {filteredIconCategories.map((category, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {category.title} Icons
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {category.icons.map((iconItem, iconIndex) => (
              <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 3', lg: 'span 2' } }} key={iconIndex}>
                <Tooltip title={`<${iconItem.name}Icon />`} arrow>
                  <Paper 
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    <IconButton 
                      size="large" 
                      color="primary"
                      sx={{ mb: 1 }}
                    >
                      {iconItem.icon}
                    </IconButton>
                    <Typography variant="caption" align="center">
                      {iconItem.name}
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default IconsPage;