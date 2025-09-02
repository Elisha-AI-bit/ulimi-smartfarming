import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Chip,
  LinearProgress
} from '@mui/material';
import { 
  Pets as PetsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const LivestockMonitoring = () => {
  // Mock livestock data
  const [livestockData] = useState([
    { id: 1, name: 'Dairy Cow 1', type: 'Cow', health: 'Good', lastFed: '2 hours ago', weight: '650 kg', milkProduction: '25 L/day', alerts: [] },
    { id: 2, name: 'Dairy Cow 2', type: 'Cow', health: 'Good', lastFed: '1 hour ago', weight: '680 kg', milkProduction: '28 L/day', alerts: [] },
    { id: 3, name: 'Sheep 1', type: 'Sheep', health: 'Fair', lastFed: '4 hours ago', weight: '75 kg', milkProduction: '2 L/day', alerts: ['Low activity'] },
    { id: 4, name: 'Goat 1', type: 'Goat', health: 'Poor', lastFed: '8 hours ago', weight: '45 kg', milkProduction: '1 L/day', alerts: ['Low appetite', 'Lethargy'] },
  ]);

  const getHealthColor = (health) => {
    switch(health.toLowerCase()) {
      case 'good': return 'success';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Livestock Monitoring
        </Typography>
        
        <Grid container spacing={3}>
          {livestockData.map((animal) => (
            <Grid item xs={12} md={6} key={animal.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                borderLeft: animal.alerts.length > 0 ? '4px solid #ff9800' : 'none'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PetsIcon sx={{ mr: 1, color: '#2e7d32' }} />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {animal.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={animal.health} 
                      color={getHealthColor(animal.health)} 
                      size="small"
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Type
                      </Typography>
                      <Typography variant="body1">
                        {animal.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Weight
                      </Typography>
                      <Typography variant="body1">
                        {animal.weight}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Last Fed
                      </Typography>
                      <Typography variant="body1">
                        {animal.lastFed}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="textSecondary">
                        Milk Production
                      </Typography>
                      <Typography variant="body1">
                        {animal.milkProduction}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  {animal.alerts.length > 0 && (
                    <Box sx={{ mt: 2, p: 1, backgroundColor: '#ff980010', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <WarningIcon sx={{ color: '#ff9800', mr: 1 }} />
                        <Typography variant="subtitle2" sx={{ color: '#ff9800' }}>
                          Alerts
                        </Typography>
                      </Box>
                      {animal.alerts.map((alert, index) => (
                        <Chip 
                          key={index}
                          label={alert} 
                          size="small" 
                          sx={{ mr: 1, mb: 1, backgroundColor: '#ff980020', color: '#ff9800' }}
                        />
                      ))}
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
                    <Button 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderColor: '#2e7d32',
                        color: '#2e7d32',
                        '&:hover': {
                          borderColor: '#1b5e20',
                          backgroundColor: 'rgba(46, 125, 50, 0.04)'
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderColor: '#2196f3',
                        color: '#2196f3',
                        '&:hover': {
                          borderColor: '#0d47a1',
                          backgroundColor: 'rgba(33, 150, 243, 0.04)'
                        }
                      }}
                    >
                      Feed Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PetsIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Livestock Health Overview
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" align="center" sx={{ color: '#4caf50', mb: 1 }}>
                          78%
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary">
                          Overall Health Score
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={78} 
                          sx={{ 
                            mt: 1, 
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#4caf50'
                            }
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" align="center" sx={{ color: '#2196f3', mb: 1 }}>
                          85%
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary">
                          Feeding Compliance
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={85} 
                          sx={{ 
                            mt: 1, 
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#2196f3'
                            }
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" align="center" sx={{ color: '#ff9800', mb: 1 }}>
                          12%
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary">
                          Alert Rate
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={12} 
                          sx={{ 
                            mt: 1, 
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#ff9800'
                            }
                          }} 
                        />
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

export default LivestockMonitoring;