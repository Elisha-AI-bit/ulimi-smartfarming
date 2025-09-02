import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
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

const SensorData = () => {
  const [sensorData] = useState(mockSensorData);

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Sensor Data
        </Typography>
        
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
                    Sensor Data Overview
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={400}>
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

export default SensorData;