import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  WbSunny as WbSunnyIcon,
  Cloud as CloudIcon,
  Opacity as OpacityIcon,
  Air as AirIcon,
  Thermostat as ThermostatIcon,
  Water as WaterIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FarmerWeather = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  // Mock weather data
  const mockWeatherData = {
    location: 'Lusaka, Zambia',
    temperature: 28,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8,
    precipitation: 0,
    uvIndex: 7,
    sunrise: '06:15 AM',
    sunset: '06:30 PM'
  };

  // Mock forecast data
  const mockForecastData = [
    { day: 'Mon', high: 30, low: 19, condition: 'Sunny' },
    { day: 'Tue', high: 32, low: 20, condition: 'Sunny' },
    { day: 'Wed', high: 29, low: 18, condition: 'Partly Cloudy' },
    { day: 'Thu', high: 27, low: 17, condition: 'Cloudy' },
    { day: 'Fri', high: 31, low: 19, condition: 'Sunny' },
    { day: 'Sat', high: 33, low: 21, condition: 'Sunny' },
    { day: 'Sun', high: 30, low: 19, condition: 'Partly Cloudy' }
  ];

  // Mock hourly data for chart
  const hourlyData = [
    { time: '6 AM', temp: 19, humidity: 65 },
    { time: '9 AM', temp: 24, humidity: 55 },
    { time: '12 PM', temp: 28, humidity: 45 },
    { time: '3 PM', temp: 30, humidity: 40 },
    { time: '6 PM', temp: 26, humidity: 50 },
    { time: '9 PM', temp: 22, humidity: 58 }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setForecastData(mockForecastData);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'sunny':
        return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD600' }} />;
      case 'partly cloudy':
        return <CloudIcon sx={{ fontSize: 40, color: '#90A4AE' }} />;
      case 'rainy':
        return <OpacityIcon sx={{ fontSize: 40, color: '#29B6F6' }} />;
      case 'cloudy':
        return <CloudIcon sx={{ fontSize: 40, color: '#78909C' }} />;
      default:
        return <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD600' }} />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="farmer" userName="Farmer">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#2E7D32' }} />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="farmer" userName="Farmer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 500 }}>
            Weather Forecast
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
          >
            Refresh Data
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {/* Current Weather */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Current Weather in {weatherData.location}
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {getWeatherIcon(weatherData.condition)}
                    <Typography variant="h2" sx={{ ml: 2, fontWeight: 'bold', color: '#2E7D32' }}>
                      {weatherData.temperature}°C
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ThermostatIcon sx={{ mr: 1, color: '#FF5722' }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#616161' }}>Condition</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.condition}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <OpacityIcon sx={{ mr: 1, color: '#2196F3' }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#616161' }}>Humidity</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.humidity}%</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AirIcon sx={{ mr: 1, color: '#00BCD4' }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#616161' }}>Wind</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.windSpeed} km/h</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WaterIcon sx={{ mr: 1, color: '#1E88E5' }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#616161' }}>Precipitation</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.precipitation}%</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WbSunnyIcon sx={{ mr: 1, color: '#FF9800' }} />
                          <Box>
                            <Typography variant="body2" sx={{ color: '#616161' }}>UV Index</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.uvIndex}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={4}>
                        <Box>
                          <Typography variant="body2" sx={{ color: '#616161' }}>Sunrise/Sunset</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{weatherData.sunrise} / {weatherData.sunset}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Hourly Forecast Chart */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Today's Forecast
                  </Typography>
                </Box>
                
                <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="temp" 
                        name="Temperature (°C)" 
                        stroke="#FF5722" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="humidity" 
                        name="Humidity (%)" 
                        stroke="#2196F3" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* 7-Day Forecast */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    7-Day Forecast
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {forecastData.map((day, index) => (
                    <Grid item xs={6} sm={4} md={2} lg={1.7} key={index}>
                      <Card sx={{ 
                        borderRadius: 2, 
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 2
                      }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {day.day}
                        </Typography>
                        {getWeatherIcon(day.condition)}
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: '#FF5722', fontWeight: 'bold' }}>
                            {day.high}°
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#2196F3' }}>
                            {day.low}°
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1, color: '#616161' }}>
                          {day.condition}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Farming Recommendations */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Farming Recommendations
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #4CAF50'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#4CAF50' }}>
                          Irrigation Advice
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          With the upcoming rainfall on Wednesday, you can reduce irrigation for your crops by 30% to conserve water.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #FF9800'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#FF9800' }}>
                          Planting Window
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          The optimal planting window for tomatoes is in the next 2 days before the expected rainfall.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #2196F3'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#2196F3' }}>
                      Pest Alert
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          High humidity levels may increase the risk of fungal diseases. Consider applying preventive treatment.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default FarmerWeather;