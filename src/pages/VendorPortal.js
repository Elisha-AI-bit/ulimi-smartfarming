import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Chip
} from '@mui/material';
import { 
  Store as StoreIcon,
  Assessment as AssessmentIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const VendorPortal = () => {
  // Mock data
  const statsData = [
    { title: 'Total Products', value: '12', icon: <InventoryIcon />, color: '#2e7d32' },
    { title: 'Total Sales', value: 'K1,245.50', icon: <StoreIcon />, color: '#2e7d32' },
    { title: 'Pending Orders', value: '3', icon: <AssessmentIcon />, color: '#ff9800' },
  ];

  return (
    <DashboardLayout userRole="vendor" userName="Vendor">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Vendor Portal
        </Typography>
        
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
                  <Typography variant="h3" sx={{ color: stat.color, fontWeight: 500 }}>
                    {stat.value}
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

export default VendorPortal;