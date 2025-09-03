import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  Agriculture as AgricultureIcon,
  Opacity as OpacityIcon,
  Thermostat as ThermostatIcon,
  Water as WaterIcon,
  TrendingUp as TrendingUpIcon,
  Task as TaskIcon,
  Forum as ForumIcon,
  WbSunny as WbSunnyIcon,
  DeviceHub as DeviceHubIcon,
  SmartToy as SmartToyIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for sensor readings
const mockSensorData = [
  { time: '00:00', moisture: 45, temperature: 22, humidity: 65 },
  { time: '04:00', moisture: 42, temperature: 21, humidity: 68 },
  { time: '08:00', moisture: 38, temperature: 24, humidity: 70 },
  { time: '12:00', moisture: 35, temperature: 28, humidity: 62 },
  { time: '16:00', moisture: 37, temperature: 27, humidity: 60 },
  { time: '20:00', moisture: 40, temperature: 24, humidity: 63 },
];

// Mock data for farm metrics
const farmMetrics = [
  { 
    title: 'Soil Moisture', 
    value: '42%', 
    icon: <OpacityIcon />, 
    color: '#2196f3',
    details: [
      { label: 'Current Reading', value: '42%' },
      { label: 'Optimal Range', value: '35-50%' },
      { label: 'Last Updated', value: '2 hours ago' },
      { label: 'Trend', value: 'Stable' }
    ]
  },
  { 
    title: 'Temperature', 
    value: '24°C', 
    icon: <ThermostatIcon />, 
    color: '#ff9800',
    details: [
      { label: 'Current Reading', value: '24°C' },
      { label: 'Optimal Range', value: '20-30°C' },
      { label: 'Last Updated', value: '15 minutes ago' },
      { label: 'Trend', value: 'Increasing' }
    ]
  },
  { 
    title: 'Humidity', 
    value: '65%', 
    icon: <WaterIcon />, 
    color: '#4caf50',
    details: [
      { label: 'Current Reading', value: '65%' },
      { label: 'Optimal Range', value: '60-70%' },
      { label: 'Last Updated', value: '30 minutes ago' },
      { label: 'Trend', value: 'Decreasing' }
    ]
  },
  { 
    title: 'Crop Health', 
    value: 'Good', 
    icon: <AgricultureIcon />, 
    color: '#2e7d32',
    details: [
      { label: 'Health Status', value: 'Good' },
      { label: 'Pest Risk', value: 'Low' },
      { label: 'Disease Risk', value: 'Very Low' },
      { label: 'Last Assessment', value: '1 day ago' }
    ]
  },
];

// Quick action items
const quickActions = [
  { title: 'Farm Management', icon: <AgricultureIcon />, path: '/farm-management' },
  { title: 'Task Management', icon: <TaskIcon />, path: '/task-management' },
  { title: 'Community Forum', icon: <ForumIcon />, path: '/community' },
  { title: 'Weather Forecast', icon: <WbSunnyIcon />, path: '/weather' },
  { title: 'Irrigation Control', icon: <DeviceHubIcon />, path: 'https://iot.ulimi.smartfarming.com' },
  { title: 'AI Advisor', icon: <SmartToyIcon />, path: '/ai-advisor' },
];

const FarmerDashboard = () => {
  const [sensorData] = useState(mockSensorData);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const handleViewDetails = (metric) => {
    setSelectedMetric(metric);
  };

  const handleViewAll = () => {
    setViewAllOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedMetric(null);
  };

  const handleCloseViewAll = () => {
    setViewAllOpen(false);
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500 }}>
            Farmer Dashboard
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<VisibilityIcon />}
            onClick={handleViewAll}
            sx={{ borderColor: '#2e7d32', color: '#2e7d32' }}
          >
            View All Data
          </Button>
        </Box>
        
        {/* Farm Metrics Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {farmMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '50%', 
                      backgroundColor: `${metric.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: metric.color
                    }}>
                      {metric.icon}
                    </Box>
                    <Chip 
                      label="Optimal" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#4caf5020', 
                        color: '#4caf50',
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: metric.color, fontWeight: 500 }}>
                    {metric.value}
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewDetails(metric)}
                    sx={{ mt: 1, color: metric.color, textTransform: 'none' }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Quick Actions
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ 
                          height: '100%',
                          flexDirection: 'column',
                          textTransform: 'none',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          '&:hover': {
                            borderColor: '#2e7d32',
                            backgroundColor: 'rgba(46, 125, 50, 0.04)',
                            color: '#2e7d32'
                          }
                        }}
                        onClick={() => handleNavigation(action.path)}
                      >
                        {action.icon}
                        <Typography variant="caption" sx={{ mt: 1 }}>
                          {action.title}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Sensor Data Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Recent Sensor Data
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sensorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="moisture" stroke="#2e7d32" name="Soil Moisture (%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="temperature" stroke="#ff9800" name="Temperature (°C)" strokeWidth={2} />
                    <Line type="monotone" dataKey="humidity" stroke="#2196f3" name="Humidity (%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Metric Details Dialog */}
      <Dialog open={!!selectedMetric} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedMetric?.title} Details
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              width: 56, 
              height: 56, 
              borderRadius: '50%', 
              backgroundColor: `${selectedMetric?.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: selectedMetric?.color,
              mr: 2
            }}>
              {selectedMetric?.icon}
            </Box>
            <Typography variant="h4" sx={{ color: selectedMetric?.color }}>
              {selectedMetric?.value}
            </Typography>
          </Box>
          {selectedMetric && (
            <List>
              {selectedMetric.details.map((detail, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemText 
                    primary={detail.label} 
                    secondary={detail.value}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* View All Data Dialog */}
      <Dialog open={viewAllOpen} onClose={handleCloseViewAll} maxWidth="md" fullWidth>
        <DialogTitle>
          All Farm Data Overview
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
            Sensor Readings
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="moisture" stroke="#2e7d32" name="Soil Moisture (%)" strokeWidth={2} />
                <Line type="monotone" dataKey="temperature" stroke="#ff9800" name="Temperature (°C)" strokeWidth={2} />
                <Line type="monotone" dataKey="humidity" stroke="#2196f3" name="Humidity (%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#2e7d32' }}>
            Farm Metrics
          </Typography>
          <Grid container spacing={2}>
            {farmMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: `${metric.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: metric.color,
                        mr: 1
                      }}>
                        {metric.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: metric.color }}>
                        {metric.title}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      {metric.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewAll} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default FarmerDashboard;