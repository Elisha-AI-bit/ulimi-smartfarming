import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import zambianDemoData from '../utils/zambian-demo-data';

// Generate Zambian farm performance data
const generateZambianFarmData = () => {
  const farms = ['Mwale Farm', 'Banda Estate', 'Kaunda Ranch', 'Phiri Plantation'];
  return farms.map(farm => ({
    name: farm,
    performance: Math.floor(Math.random() * 30 + 70), // Performance percentage 70-100%
    yield: Math.floor(Math.random() * 800 + 800), // Yield in kg
    efficiency: Math.floor(Math.random() * 30 + 65) // Efficiency percentage 65-95%
  }));
};

// Generate Zambian system metrics data
const generateZambianSystemData = () => {
  const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
  return times.map(time => ({
    time,
    cpu: Math.floor(Math.random() * 50 + 20), // CPU usage percentage
    memory: Math.floor(Math.random() * 40 + 40), // Memory usage percentage
    storage: Math.floor(Math.random() * 20 + 25) // Storage usage percentage
  }));
};

const PerformanceMetrics = () => {
  const [farmData, setFarmData] = useState([]);
  const [systemData, setSystemData] = useState([]);

  useEffect(() => {
    // Generate Zambian demo data
    setFarmData(generateZambianFarmData());
    setSystemData(generateZambianSystemData());
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          Performance Metrics
        </Typography>
        
        <Grid container spacing={2}>
          {/* Farm Performance Comparison */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Farm Performance Comparison
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={farmData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="name" axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <YAxis axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="performance" fill="#2196f3" name="Performance (%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="yield" fill="#4caf50" name="Yield (kg)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="efficiency" fill="#ff9800" name="Efficiency (%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* System Metrics */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    System Resource Usage
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="time" axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <YAxis axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} 
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#2196f3" 
                        name="CPU" 
                        strokeWidth={2} 
                        dot={{ stroke: '#2196f3', strokeWidth: 2, r: 4, fill: 'white' }} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#ff9800" 
                        name="Memory" 
                        strokeWidth={2} 
                        dot={{ stroke: '#ff9800', strokeWidth: 2, r: 4, fill: 'white' }} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="storage" 
                        stroke="#f44336" 
                        name="Storage" 
                        strokeWidth={2} 
                        dot={{ stroke: '#f44336', strokeWidth: 2, r: 4, fill: 'white' }} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Stats Overview */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#000000' }}>
                  System Health
                </Typography>
                <Typography variant="h4" sx={{ color: '#66BB6A', fontWeight: 500 }}>
                  98.7%
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                  Operational
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#000000' }}>
                  Active Connections
                </Typography>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 500 }}>
                  1,248
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                  +12% from last hour
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#000000' }}>
                  Data Processed
                </Typography>
                <Typography variant="h4" sx={{ color: '#FBC02D', fontWeight: 500 }}>
                  2.4TB
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                  +15% from yesterday
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default PerformanceMetrics;