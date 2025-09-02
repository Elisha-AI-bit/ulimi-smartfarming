import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  Button
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
  SmartToy as SmartToyIcon
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
  { title: 'Soil Moisture', value: '42%', icon: <OpacityIcon />, color: '#2196f3' },
  { title: 'Temperature', value: '24°C', icon: <ThermostatIcon />, color: '#ff9800' },
  { title: 'Humidity', value: '65%', icon: <WaterIcon />, color: '#4caf50' },
  { title: 'Crop Health', value: 'Good', icon: <AgricultureIcon />, color: '#2e7d32' },
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
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Farmer Dashboard
        </Typography>
        
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
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: '#2e7d32' }}>
                  Quick Actions
                </Typography>
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
    </DashboardLayout>
  );
};

export default FarmerDashboard;