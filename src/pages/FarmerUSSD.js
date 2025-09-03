import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip
} from '@mui/material';
import { 
  Forum as ForumIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Sms as SmsIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const FarmerUSSD = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [serviceCode, setServiceCode] = useState('*123#');

  // Mock USSD session data
  const [ussdSessions, setUssdSessions] = useState([
    { id: 1, service: 'Weather Update', time: '2023-06-15 08:30', status: 'Completed' },
    { id: 2, service: 'Market Prices', time: '2023-06-14 16:45', status: 'Completed' },
    { id: 3, service: 'Pest Alert', time: '2023-06-14 10:15', status: 'Completed' },
    { id: 4, service: 'Irrigation Advice', time: '2023-06-13 07:20', status: 'Completed' },
  ]);

  const handleSendUSSD = () => {
    if (serviceCode) {
      // In a real app, this would initiate a USSD session
      alert(`USSD session initiated with code: ${serviceCode}`);
      // Add to session history
      const newSession = {
        id: ussdSessions.length + 1,
        service: 'Custom Request',
        time: new Date().toLocaleString(),
        status: 'Completed'
      };
      setUssdSessions([newSession, ...ussdSessions]);
    }
  };

  const quickCodes = [
    { code: '*123*1#', service: 'Weather Forecast' },
    { code: '*123*2#', service: 'Market Prices' },
    { code: '*123*3#', service: 'Pest Detection' },
    { code: '*123*4#', service: 'Irrigation Advice' },
    { code: '*123*5#', service: 'Financial Tips' },
  ];

  return (
    <DashboardLayout userRole="farmer" userName="Farmer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2E7D32', fontWeight: 500 }}>
          USSD/SMS Services
        </Typography>
        
        <Grid container spacing={3}>
          {/* USSD Dialer */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    USSD Dialer
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Service Code"
                      value={serviceCode}
                      onChange={(e) => setServiceCode(e.target.value)}
                      helperText="Enter USSD code to initiate service"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<SendIcon />}
                      fullWidth
                      onClick={handleSendUSSD}
                      sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF', py: 1.5 }}
                    >
                      Send USSD
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Quick Access Codes
                    </Typography>
                    
                    <Grid container spacing={1}>
                      {quickCodes.map((code, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Card 
                            sx={{ 
                              borderRadius: 2, 
                              cursor: 'pointer',
                              '&:hover': { backgroundColor: '#E8F5E9' }
                            }}
                            onClick={() => setServiceCode(code.code)}
                          >
                            <CardContent>
                              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                                {code.code}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                {code.service}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* SMS Services */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    SMS Services
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+254..."
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message..."
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      startIcon={<SendIcon />}
                      fullWidth
                      sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF', py: 1.5 }}
                    >
                      Send SMS
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Predefined Messages
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                          onClick={() => setMessage('Requesting weather update for my region')}
                        >
                          Weather Update Request
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                          onClick={() => setMessage('Requesting current market prices for maize and beans')}
                        >
                          Market Prices Request
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                          onClick={() => setMessage('Reporting pest sighting on my farm')}
                        >
                          Pest Report
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* USSD Session History */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Recent USSD Sessions
                  </Typography>
                </Box>
                
                <List>
                  {ussdSessions.map((session) => (
                    <React.Fragment key={session.id}>
                      <ListItem>
                        <ListItemIcon>
                          <ForumIcon sx={{ color: '#2E7D32' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {session.service}
                              </Typography>
                              <Chip 
                                label={session.status} 
                                size="small" 
                                sx={{ 
                                  ml: 2, 
                                  backgroundColor: session.status === 'Completed' ? '#4CAF50' : '#FF9800',
                                  color: '#FFFFFF'
                                }} 
                              />
                            </Box>
                          }
                          secondary={session.time}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Service Information */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ForumIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    About USSD/SMS Services
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>What is USSD?</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161', mb: 2 }}>
                      Unstructured Supplementary Service Data (USSD) is a protocol used by GSM cellular phones to communicate with their service provider's computers. It allows real-time communication and is especially useful in areas with limited internet connectivity.
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Benefits for Farmers</strong>
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Works without internet"
                          secondary="Access services even in areas with poor connectivity"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Real-time information"
                          secondary="Get instant updates on weather, market prices, and more"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Low cost"
                          secondary="Minimal charges for USSD sessions"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Available Services</strong>
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Weather Forecast"
                          secondary="Get localized weather predictions"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Market Prices"
                          secondary="Current prices for crops in your region"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Pest Detection"
                          secondary="Identify and get solutions for crop pests"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Irrigation Advice"
                          secondary="Optimize water usage for your crops"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Financial Tips"
                          secondary="Agricultural financing and savings advice"
                        />
                      </ListItem>
                    </List>
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

export default FarmerUSSD;