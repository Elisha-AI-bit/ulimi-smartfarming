import React, { useState, useEffect } from 'react';
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
  ListItemText,
  useTheme,
  useMediaQuery
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
  ArrowForward as ArrowForwardIcon,
  Compost as CompostIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import zambianDemoDataGenerator from '../utils/zambian-demo-data';

// Generate Zambian-specific demo data for a farmer
const generateFarmerDemoData = () => {
  // Generate a farmer user
  const farmer = {
    id: 'farmer-1',
    email: 'mwansa@example.com',
    name: 'Mwansa Mwanza',
    role: 'farmer',
    phone: '0971234567',
    address: 'Plot 45, Chilanga, Lusaka Province',
    province: 'Lusaka',
    city: 'Lusaka'
  };
  
  // Generate a farm
  const farm = {
    id: 'farm-1',
    name: "Mwansa's Maize Farm",
    location: 'Chilanga, Lusaka',
    size: '12.5',
    cropType: 'Maize',
    ownerId: farmer.id,
    province: 'Lusaka'
  };
  
  // Generate sensor data with Zambian context
  const sensorData = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    
    // Zambian-specific values for maize farming
    const moisture = 42 + (Math.random() - 0.5) * 10; // 37-47% optimal for maize
    const temperature = 24 + (Math.random() - 0.5) * 8; // 20-28°C typical for Zambia
    const humidity = 65 + (Math.random() - 0.5) * 20; // 55-75% typical
    
    sensorData.push({
      time: date.toISOString().slice(11, 16), // HH:MM format
      moisture: parseFloat(moisture.toFixed(2)),
      temperature: parseFloat(temperature.toFixed(2)),
      humidity: parseFloat(humidity.toFixed(2))
    });
  }
  
  return { farmer, farm, sensorData };
};

// Farm metrics with Zambian context
const getFarmMetrics = (farm) => [
  { 
    title: 'Soil Moisture', 
    value: '42%', 
    icon: <OpacityIcon />, 
    color: '#2e7d32',
    status: 'Optimal',
    statusColor: 'success',
    details: [
      { label: 'Current Reading', value: '42%' },
      { label: 'Optimal Range', value: '35-50%' },
      { label: 'Crop Type', value: farm.cropType },
      { label: 'Last Updated', value: '15 minutes ago' }
    ]
  },
  { 
    title: 'Temperature', 
    value: '24°C', 
    icon: <ThermostatIcon />, 
    color: '#ff9800',
    status: 'Good',
    statusColor: 'warning',
    details: [
      { label: 'Current Reading', value: '24°C' },
      { label: 'Optimal Range', value: '20-30°C' },
      { label: 'Location', value: farm.location },
      { label: 'Season', value: 'Rainy Season' }
    ]
  },
  { 
    title: 'Humidity', 
    value: '65%', 
    icon: <WaterIcon />, 
    color: '#4caf50',
    status: 'Optimal',
    statusColor: 'success',
    details: [
      { label: 'Current Reading', value: '65%' },
      { label: 'Optimal Range', value: '60-70%' },
      { label: 'Province', value: farm.province },
      { label: 'Trend', value: 'Stable' }
    ]
  },
  { 
    title: 'Crop Health', 
    value: 'Good', 
    icon: <AgricultureIcon />, 
    color: '#8bc34a',
    status: 'Healthy',
    statusColor: 'success',
    details: [
      { label: 'Health Status', value: 'Good' },
      { label: 'Pest Risk', value: 'Low' },
      { label: 'Disease Risk', value: 'Very Low' },
      { label: 'Last Assessment', value: '2 hours ago' }
    ]
  },
];

// Quick action items with Zambian context
const quickActions = [
  { title: 'Farm Management', icon: <AgricultureIcon />, path: '/farmer/farm-management', description: 'Manage crops, fields, and planting schedule' },
  { title: 'Task Management', icon: <TaskIcon />, path: '/farmer/tasks', description: 'Create and track farming tasks and schedules' },
  { title: 'Community Forum', icon: <ForumIcon />, path: '/community', description: 'Connect with other Zambian farmers' },
  { title: 'Weather Forecast', icon: <WbSunnyIcon />, path: '/farmer/weather', description: 'Check Lusaka weather conditions' },
  { title: 'Irrigation Control', icon: <DeviceHubIcon />, path: 'https://iot.ulimi.smartfarming.com', description: 'Monitor and control irrigation systems' },
  { title: 'AI Advisor', icon: <SmartToyIcon />, path: '/farmer/ai-advisor', description: 'Get personalized farming recommendations' },
  { title: 'Market Prices', icon: <TrendingUpIcon />, path: '/marketplace', description: 'Check current maize prices in Zambia' },
  { title: 'Soil Analysis', icon: <CompostIcon />, path: '/sensor-data', description: 'View detailed soil nutrient levels' }
];

const FarmerDashboard = () => {
  const [demoData, setDemoData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Generate demo data on component mount
    const data = generateFarmerDemoData();
    setDemoData(data);
  }, []);

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

  if (!demoData) {
    return <DashboardLayout>Loading Zambian demo data...</DashboardLayout>;
  }

  const { farmer, farm, sensorData } = demoData;
  const farmMetrics = getFarmMetrics(farm);

  return (
    <DashboardLayout userRole="farmer" userName={farmer.name}>
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        {/* Welcome Banner */}
        <Box 
          sx={{ 
            backgroundColor: '#4caf50', 
            borderRadius: 2, 
            p: 3, 
            mb: 3, 
            color: 'white',
            backgroundImage: 'linear-gradient(to right, #4caf50, #2e7d32)'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Welcome to Smart Farm, {farmer.name}
          </Typography>
          <Typography variant="body2">
            Your {farm.cropType} farm in {farm.location} is performing well. All systems optimal.
          </Typography>
        </Box>
        
        {/* Current Conditions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Current Conditions - {farm.name}
          </Typography>
          <Grid container spacing={2}>
            {farmMetrics.map((metric, index) => (
              <Grid xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ color: metric.color, mr: 0.5 }}>
                            {metric.icon}
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {metric.title}
                          </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {metric.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {metric.title === 'Soil Moisture' ? 'Perfect for maize growth' : 
                           metric.title === 'Temperature' ? 'Ideal for current season' : 
                           metric.title === 'Humidity' ? 'All moisture levels stable' : 'All crops healthy'}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Optimal" 
                        size="small" 
                        color="success"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '4px',
                          height: 24
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        
        {/* Quick Actions */}
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  onClick={() => handleNavigation(action.path)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        backgroundColor: action.title === 'Farm Management' ? '#4caf50' : 
                                          action.title === 'Task Management' ? '#2196f3' : 
                                          action.title === 'Community Forum' ? '#ff9800' : 
                                          action.title === 'Weather Forecast' ? '#9c27b0' : 
                                          action.title === 'Irrigation Control' ? '#03a9f4' : 
                                          action.title === 'AI Advisor' ? '#e91e63' : 
                                          action.title === 'Market Prices' ? '#ff5722' : '#8bc34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mr: 1.5
                      }}>
                        {action.icon}
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        </Box>
        
        {/* Recent Sensor Data */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1,
            p: 1,
            borderLeft: '4px solid #2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.05)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Sensor Data - {farm.name}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 300 }, minHeight: 250, p: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#4caf50" 
                  name="Humidity (%)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#4caf50', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#4caf50', strokeWidth: 1 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#2196f3" 
                  name="Soil Moisture (%)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#2196f3', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#2196f3', strokeWidth: 1 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ff9800" 
                  name="Temperature (°C)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#ff9800', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#ff9800', strokeWidth: 1 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Metric Details Dialog */}
      <Dialog 
        open={!!selectedMetric} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        sx={{ 
          '& .MuiDialog-paper': { 
            borderRadius: 2,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          } 
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '8px', 
              backgroundColor: selectedMetric?.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mr: 2
            }}>
              {selectedMetric?.icon}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {selectedMetric?.title} Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current readings and status for {farm.name}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mr: 2 }}>
              {selectedMetric?.value}
            </Typography>
            <Chip 
              label="Optimal" 
              size="small" 
              color="success"
              sx={{ 
                fontWeight: 500,
                borderRadius: '4px',
                height: 24
              }} 
            />
          </Box>
          {selectedMetric && (
            <List sx={{ pt: 0, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
              {selectedMetric.details.map((detail, index) => (
                <ListItem key={index} sx={{ py: 1, px: 2, borderBottom: index < selectedMetric.details.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none' }}>
                  <ListItemText 
                    primary={detail.label} 
                    secondary={detail.value}
                    primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }}
                    secondaryTypographyProps={{ fontWeight: 500, color: 'text.primary' }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Button 
            onClick={handleCloseDialog} 
            variant="contained"
            size="small"
            sx={{ 
              fontWeight: 500,
              backgroundColor: '#4caf50',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#43a047',
                boxShadow: 'none'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* View All Data Dialog */}
      <Dialog 
        open={viewAllOpen} 
        onClose={handleCloseViewAll} 
        maxWidth="md" 
        fullWidth
        sx={{ 
          '& .MuiDialog-paper': { 
            borderRadius: 2,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          } 
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Farm Data Overview - {farm.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete analysis of your farm metrics in {farm.location}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1,
            p: 1,
            borderLeft: '4px solid #2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.05)'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Sensor Readings (Last 24 Hours)
            </Typography>
          </Box>
          <Box sx={{ width: '100%', height: { xs: 250, sm: 300 }, minHeight: 250, p: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#4caf50" 
                  name="Humidity (%)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#4caf50', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#4caf50', strokeWidth: 1 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#2196f3" 
                  name="Soil Moisture (%)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#2196f3', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#2196f3', strokeWidth: 1 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ff9800" 
                  name="Temperature (°C)" 
                  strokeWidth={2} 
                  dot={{ stroke: '#ff9800', strokeWidth: 1, r: 3, fill: 'white' }} 
                  activeDot={{ r: 6, stroke: '#ff9800', strokeWidth: 1 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 3,
            mb: 1,
            p: 1,
            borderLeft: '4px solid #4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.05)'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Farm Metrics Summary
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {farmMetrics.map((metric, index) => (
              <Grid xs={12} sm={6} key={index}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '8px', 
                        backgroundColor: metric.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mr: 1.5
                      }}>
                        {metric.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                          {metric.title}
                        </Typography>
                        <Chip 
                          label="Optimal" 
                          size="small" 
                          color="success"
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: '4px',
                            height: 24
                          }} 
                        />
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, ml: 1 }}>
                      {metric.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 3,
            mb: 1,
            p: 1,
            borderLeft: '4px solid #ff9800',
            backgroundColor: 'rgba(255, 152, 0, 0.05)'
          }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Farm Information
            </Typography>
          </Box>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Farm Name</Typography>
                  <Typography variant="body1">{farm.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{farm.location}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Size</Typography>
                  <Typography variant="body1">{farm.size} hectares</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Crop Type</Typography>
                  <Typography variant="body1">{farm.cropType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Province</Typography>
                  <Typography variant="body1">{farm.province}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Farmer</Typography>
                  <Typography variant="body1">{farmer.name}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Button 
            onClick={handleCloseViewAll} 
            variant="contained"
            size="small"
            sx={{ 
              fontWeight: 500,
              backgroundColor: '#4caf50',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#43a047',
                boxShadow: 'none'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default FarmerDashboard;