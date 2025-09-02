import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

// Stats data
const statsData = [
  { title: 'Total Users', value: '1,248', icon: <PeopleIcon />, color: '#2e7d32', change: '+12% from last month' },
  { title: 'Active Farms', value: '342', icon: <TrendingUpIcon />, color: '#2e7d32', change: '+8% from last month' },
  { title: 'Data Points', value: '2.4M', icon: <StorageIcon />, color: '#2e7d32', change: '+15% from last month' },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Admin Dashboard
        </Typography>
        
        {/* Stats Overview */}
        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '50%', 
                      backgroundColor: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      mr: 2
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: stat.color, fontWeight: 500, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.change}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default AdminDashboard;