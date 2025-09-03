import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import { 
  Pets as PetsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  Info as InfoIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const LivestockMonitoring = () => {
  // Mock livestock data
  const [livestockData] = useState([
    { 
      id: 1, 
      name: 'Dairy Cow 1', 
      type: 'Cow', 
      health: 'Good', 
      lastFed: '2 hours ago', 
      weight: '650 kg', 
      milkProduction: '25 L/day', 
      alerts: [],
      details: {
        age: '4 years',
        breed: 'Holstein Friesian',
        lastHealthCheck: '2023-05-15',
        vaccinations: ['Foot and Mouth', 'Brucellosis'],
        feedType: 'Mixed hay and grain',
        activityLevel: 'High'
      }
    },
    { 
      id: 2, 
      name: 'Dairy Cow 2', 
      type: 'Cow', 
      health: 'Good', 
      lastFed: '1 hour ago', 
      weight: '680 kg', 
      milkProduction: '28 L/day', 
      alerts: [],
      details: {
        age: '3 years',
        breed: 'Jersey',
        lastHealthCheck: '2023-05-14',
        vaccinations: ['Foot and Mouth', 'Brucellosis', 'Blackleg'],
        feedType: 'Alfalfa hay and grain',
        activityLevel: 'Medium'
      }
    },
    { 
      id: 3, 
      name: 'Sheep 1', 
      type: 'Sheep', 
      health: 'Fair', 
      lastFed: '4 hours ago', 
      weight: '75 kg', 
      milkProduction: '2 L/day', 
      alerts: ['Low activity'],
      details: {
        age: '2 years',
        breed: 'Suffolk',
        lastHealthCheck: '2023-05-10',
        vaccinations: ['Clostridium Perfringens'],
        feedType: 'Grass and hay',
        activityLevel: 'Low'
      }
    },
    { 
      id: 4, 
      name: 'Goat 1', 
      type: 'Goat', 
      health: 'Poor', 
      lastFed: '8 hours ago', 
      weight: '45 kg', 
      milkProduction: '1 L/day', 
      alerts: ['Low appetite', 'Lethargy'],
      details: {
        age: '1.5 years',
        breed: 'Boer',
        lastHealthCheck: '2023-05-05',
        vaccinations: ['CD&T', 'Rabies'],
        feedType: 'Browse and hay',
        activityLevel: 'Very Low'
      }
    },
  ]);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const getHealthColor = (health) => {
    switch(health.toLowerCase()) {
      case 'good': return 'success';
      case 'fair': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getHealthIcon = (health) => {
    switch(health.toLowerCase()) {
      case 'good': return <CheckCircleIcon />;
      case 'fair': return <WarningIcon />;
      case 'poor': return <WarningIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  const handleViewDetails = (animal) => {
    setSelectedAnimal(animal);
    setViewDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setViewDetailsOpen(false);
    setSelectedAnimal(null);
  };

  const handleViewHistory = () => {
    setHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryOpen(false);
  };

  const handleFeedNow = (animalId) => {
    console.log(`Feeding animal ${animalId}`);
    // In a real app, this would trigger a feeding action
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500 }}>
            Livestock Monitoring
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<HistoryIcon />}
            onClick={handleViewHistory}
            sx={{ 
              borderColor: '#2e7d32',
              color: '#2e7d32'
            }}
          >
            View History
          </Button>
        </Box>
        
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
                      <Avatar sx={{ 
                        mr: 1, 
                        backgroundColor: animal.alerts.length > 0 ? '#ff980020' : '#2e7d3220',
                        color: animal.alerts.length > 0 ? '#ff9800' : '#2e7d32'
                      }}>
                        <PetsIcon />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {animal.name}
                      </Typography>
                    </Box>
                    <Chip 
                      label={animal.health} 
                      color={getHealthColor(animal.health)} 
                      size="small"
                      icon={getHealthIcon(animal.health)}
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
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewDetails(animal)}
                      sx={{ 
                        borderColor: '#2e7d32',
                        color: '#2e7d32',
                        '&:hover': {
                          borderColor: '#1b5e20',
                          backgroundColor: 'rgba(46, 125, 50, 0.04)'
                        }
                      }}
                      variant="outlined"
                    >
                      View Details
                    </Button>
                    <Button 
                      size="small"
                      onClick={() => handleFeedNow(animal.id)}
                      sx={{ 
                        borderColor: '#2196f3',
                        color: '#2196f3',
                        '&:hover': {
                          borderColor: '#0d47a1',
                          backgroundColor: 'rgba(33, 150, 243, 0.04)'
                        }
                      }}
                      variant="outlined"
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

      {/* Animal Details Dialog */}
      <Dialog open={viewDetailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              mr: 1, 
              backgroundColor: selectedAnimal?.alerts?.length > 0 ? '#ff980020' : '#2e7d3220',
              color: selectedAnimal?.alerts?.length > 0 ? '#ff9800' : '#2e7d32'
            }}>
              <PetsIcon />
            </Avatar>
            {selectedAnimal?.name} Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAnimal && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={selectedAnimal.health} 
                  color={getHealthColor(selectedAnimal.health)} 
                  size="small"
                  icon={getHealthIcon(selectedAnimal.health)}
                />
                <Typography variant="body2" color="textSecondary">
                  Last Fed: {selectedAnimal.lastFed}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Type" 
                    secondary={selectedAnimal.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Age" 
                    secondary={selectedAnimal.details?.age || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Breed" 
                    secondary={selectedAnimal.details?.breed || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Weight" 
                    secondary={selectedAnimal.weight}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Milk Production" 
                    secondary={selectedAnimal.milkProduction}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Feed Type" 
                    secondary={selectedAnimal.details?.feedType || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Activity Level" 
                    secondary={selectedAnimal.details?.activityLevel || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Last Health Check" 
                    secondary={selectedAnimal.details?.lastHealthCheck || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Vaccinations" 
                    secondary={selectedAnimal.details?.vaccinations?.join(', ') || 'None'}
                  />
                </ListItem>
              </List>
              
              {selectedAnimal.alerts.length > 0 && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: '#ff980010', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <WarningIcon sx={{ color: '#ff9800', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ color: '#ff9800' }}>
                      Current Alerts
                    </Typography>
                  </Box>
                  <List>
                    {selectedAnimal.alerts.map((alert, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={alert} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={historyOpen} onClose={handleCloseHistory} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HistoryIcon sx={{ mr: 1, color: '#2e7d32' }} />
            Livestock Monitoring History
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
            Recent Health Checks
          </Typography>
          <List>
            {[
              { date: '2023-05-15', animal: 'Dairy Cow 1', status: 'Good', notes: 'Routine checkup, all vitals normal' },
              { date: '2023-05-14', animal: 'Dairy Cow 2', status: 'Good', notes: 'Increased milk production, healthy appetite' },
              { date: '2023-05-10', animal: 'Sheep 1', status: 'Fair', notes: 'Slight decrease in activity, monitoring required' },
              { date: '2023-05-05', animal: 'Goat 1', status: 'Poor', notes: 'Low appetite and lethargy, treatment initiated' }
            ].map((record, index) => (
              <ListItem key={index} divider>
                <ListItemText 
                  primary={`${record.animal} - ${record.date}`} 
                  secondary={record.notes}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Chip 
                  label={record.status} 
                  color={getHealthColor(record.status)} 
                  size="small"
                />
              </ListItem>
            ))}
          </List>
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#2e7d32' }}>
            Feeding Schedule
          </Typography>
          <List>
            {[
              { time: '06:00 AM', animal: 'All Cattle', feed: 'Hay and grain mix' },
              { time: '12:00 PM', animal: 'All Livestock', feed: 'Fresh water and supplements' },
              { time: '06:00 PM', animal: 'All Cattle', feed: 'Silage and protein pellets' }
            ].map((schedule, index) => (
              <ListItem key={index} divider>
                <ListItemText 
                  primary={`${schedule.time} - ${schedule.animal}`} 
                  secondary={schedule.feed}
                />
                <Button 
                  size="small" 
                  variant="outlined"
                  sx={{ 
                    borderColor: '#2196f3',
                    color: '#2196f3'
                  }}
                >
                  Log Feeding
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistory}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default LivestockMonitoring;