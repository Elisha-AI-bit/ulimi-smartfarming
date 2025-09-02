import React, { useState } from 'react';
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

// Mock data for farm comparison
const mockFarmData = [
  { name: 'Farm A', performance: 85, yield: 1200, efficiency: 78 },
  { name: 'Farm B', performance: 72, yield: 980, efficiency: 65 },
  { name: 'Farm C', performance: 91, yield: 1450, efficiency: 88 },
  { name: 'Farm D', performance: 68, yield: 890, efficiency: 62 },
];

// Mock data for system metrics
const mockSystemData = [
  { time: '00:00', cpu: 25, memory: 45, storage: 30 },
  { time: '04:00', cpu: 30, memory: 50, storage: 32 },
  { time: '08:00', cpu: 65, memory: 60, storage: 35 },
  { time: '12:00', cpu: 80, memory: 75, storage: 40 },
  { time: '16:00', cpu: 70, memory: 70, storage: 42 },
  { time: '20:00', cpu: 45, memory: 55, storage: 38 },
];

const PerformanceMetrics = () => {
  const [farmData] = useState(mockFarmData);
  const [systemData] = useState(mockSystemData);

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Performance Metrics
        </Typography>
        
        <Grid container spacing={3}>
          {/* Farm Performance Comparison */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Farm Performance Comparison
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={farmData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="performance" fill="#2e7d32" name="Performance (%)" />
                    <Bar dataKey="yield" fill="#82ca9d" name="Yield (kg)" />
                    <Bar dataKey="efficiency" fill="#ff9800" name="Efficiency (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* System Metrics */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorageIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    System Resource Usage
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={systemData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" stroke="#2e7d32" name="CPU (%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="memory" stroke="#ff9800" name="Memory (%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="storage" stroke="#2196f3" name="Storage (%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Stats Overview */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  System Health
                </Typography>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 500 }}>
                  98.7%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Operational
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  Active Connections
                </Typography>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 500 }}>
                  1,248
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +12% from last hour
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                  Data Processed
                </Typography>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 500 }}>
                  2.4TB
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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