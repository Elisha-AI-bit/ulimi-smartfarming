import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  Cloud as CloudIcon,
  Thermostat as ThermostatIcon,
  Opacity as OpacityIcon,
  Air as AirIcon,
  Water as WaterIcon,
  WbSunny as WbSunnyIcon,
  Thunderstorm as ThunderstormIcon,
  AcUnit as AcUnitIcon
} from '@mui/icons-material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';

const WeatherIntegration = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock weather data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWeatherData({
        location: 'Lusaka, Zambia',
        temperature: 28,
        condition: 'Sunny',
        humidity: 45,
        windSpeed: 8,
        precipitation: 0,
        uvIndex: 7,
        sunrise: '6:15 AM',
        sunset: '6:30 PM'
      });
      
      setForecast([
        { day: 'Today', high: 30, low: 19, condition: 'Sunny', precipitation: 0 },
        { day: 'Tomorrow', high: 32, low: 20, condition: 'Sunny', precipitation: 0 },
        { day: 'Wednesday', high: 29, low: 18, condition: 'Partly Cloudy', precipitation: 10 },
        { day: 'Thursday', high: 27, low: 17, condition: 'Cloudy', precipitation: 20 },
        { day: 'Friday', high: 31, low: 19, condition: 'Sunny', precipitation: 0 }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'sunny':
        return <WbSunnyIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#ff9800' }} />;
      case 'partly cloudy':
        return <CloudIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#90a4ae' }} />;
      case 'rainy':
        return <ThunderstormIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#2196f3' }} />;
      case 'cloudy':
        return <CloudIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#78909c' }} />;
      case 'snowy':
        return <AcUnitIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#03a9f4' }} />;
      default:
        return <CloudIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: '#90a4ae' }} />;
    }
  };

  const getFarmingAdvice = (weather) => {
    if (!weather) return [];
    
    const advice = [];
    
    if (weather.temperature > 30) {
      advice.push('High temperatures: Consider irrigation to prevent crop stress');
    }
    
    if (weather.humidity > 80) {
      advice.push('High humidity: Monitor for fungal diseases');
    }
    
    if (weather.windSpeed > 20) {
      advice.push('Windy conditions: Secure young plants and check irrigation systems');
    }
    
    if (weather.precipitation > 0) {
      advice.push('Precipitation expected: Delay spraying operations');
    }
    
    if (advice.length === 0) {
      advice.push('Weather conditions are favorable for most farming activities');
    }
    
    return advice;
  };

  if (loading) {
    return (
      <DashboardLayout userRole="farmer" userName="Farmer John">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  const farmingAdvice = getFarmingAdvice(weatherData);

  // Prepare data for temperature chart
  const temperatureData = [
    { time: '6 AM', temp: 18 },
    { time: '9 AM', temp: 21 },
    { time: '12 PM', temp: 24 },
    { time: '3 PM', temp: 26 },
    { time: '6 PM', temp: 22 },
    { time: '9 PM', temp: 19 }
  ];

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Weather Integration
        </Typography>
        
        {/* Current Weather */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Current Weather at {weatherData.location}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {getWeatherIcon(weatherData.condition)}
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 500 }}>
                  {weatherData.temperature}°C
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {weatherData.condition}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ThermostatIcon sx={{ mr: 1, color: '#ff9800' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Temperature</Typography>
                        <Typography variant="h6">{weatherData.temperature}°C</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <OpacityIcon sx={{ mr: 1, color: '#2196f3' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Humidity</Typography>
                        <Typography variant="h6">{weatherData.humidity}%</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AirIcon sx={{ mr: 1, color: '#00bcd4' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Wind</Typography>
                        <Typography variant="h6">{weatherData.windSpeed} km/h</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WaterIcon sx={{ mr: 1, color: '#1976d2' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Precipitation</Typography>
                        <Typography variant="h6">{weatherData.precipitation} mm</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WbSunnyIcon sx={{ mr: 1, color: '#ffeb3b' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Sunrise</Typography>
                        <Typography variant="h6">{weatherData.sunrise}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WbSunnyIcon sx={{ mr: 1, color: '#ff9800' }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Sunset</Typography>
                        <Typography variant="h6">{weatherData.sunset}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* Temperature Chart */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Temperature Forecast
            </Typography>
            <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    name="Temperature (°C)" 
                    stroke="#ff9800" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
        
        {/* Farming Advice */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Farming Advice
            </Typography>
            <Grid container spacing={2}>
              {farmingAdvice.map((advice, index) => (
                <Grid item xs={12} key={index}>
                  <Chip 
                    label={advice} 
                    variant="outlined" 
                    sx={{ 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      borderColor: '#2e7d32',
                      color: '#2e7d32'
                    }} 
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
        
        {/* 5-Day Forecast */}
        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              5-Day Forecast
            </Typography>
            <Grid container spacing={2}>
              {forecast.map((day, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {day.day}
                      </Typography>
                      <Box sx={{ my: 1, display: 'flex', justifyContent: 'center' }}>
                        {getWeatherIcon(day.condition)}
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {day.condition}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">
                          <strong>{day.high}°</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {day.low}°
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                        <WaterIcon sx={{ fontSize: 16, mr: 0.5, color: '#2196f3' }} />
                        <Typography variant="caption">{day.precipitation}%</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default WeatherIntegration;