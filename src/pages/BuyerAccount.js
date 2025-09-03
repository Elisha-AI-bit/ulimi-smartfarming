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
  FormControlLabel,
  Switch,
  Avatar,
  IconButton
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CameraAlt as CameraAltIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const BuyerAccount = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Buyer',
    email: 'john.buyer@example.com',
    phone: '+260 971 234 567',
    address: '123 Farm Road, Lusaka, Zambia',
    deliveryPreference: 'home',
    notificationEmails: true,
    notificationSMS: true,
    newsletter: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the data
    alert('Account information updated successfully!');
    setEditing(false);
  };

  return (
    <DashboardLayout userRole="buyer" userName="Buyer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 500 }}>
            Account Settings
          </Typography>
          <Button 
            variant="contained" 
            startIcon={editing ? <SaveIcon /> : <EditIcon />}
            onClick={() => setEditing(!editing)}
            sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Profile Information
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar 
                      sx={{ width: 100, height: 100, mb: 2 }} 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                    />
                    <IconButton 
                      sx={{ 
                        position: 'absolute', 
                        bottom: 10, 
                        right: 0, 
                        backgroundColor: '#2E7D32',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#1B5E20' }
                      }}
                    >
                      <CameraAltIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {formData.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#616161' }}>
                    Buyer Account
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Delivery Address"
                        name="address"
                        multiline
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!editing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControl fullWidth disabled={!editing}>
                        <InputLabel>Delivery Preference</InputLabel>
                        <Select
                          name="deliveryPreference"
                          value={formData.deliveryPreference}
                          label="Delivery Preference"
                          onChange={handleInputChange}
                        >
                          <MenuItem value="home">Home Delivery</MenuItem>
                          <MenuItem value="pickup">Pickup Point</MenuItem>
                          <MenuItem value="office">Office Delivery</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Notification Settings
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.notificationEmails}
                          onChange={handleSwitchChange}
                          name="notificationEmails"
                          disabled={!editing}
                        />
                      }
                      label="Email Notifications"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.notificationSMS}
                          onChange={handleSwitchChange}
                          name="notificationSMS"
                          disabled={!editing}
                        />
                      }
                      label="SMS Notifications"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.newsletter}
                          onChange={handleSwitchChange}
                          name="newsletter"
                          disabled={!editing}
                        />
                      }
                      label="Newsletter Subscription"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                      Notification Preferences
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161', mb: 2 }}>
                      Choose what types of notifications you want to receive:
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked disabled={!editing} />}
                          label="Order confirmations"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked disabled={!editing} />}
                          label="Shipping updates"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked disabled={!editing} />}
                          label="Delivery notifications"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch disabled={!editing} />}
                          label="Promotional offers"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked disabled={!editing} />}
                          label="Product recommendations"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Security Settings */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Security Settings
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ mb: 2, borderColor: '#2E7D32', color: '#2E7D32' }}
                    >
                      Change Password
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ borderColor: '#FF9800', color: '#FF9800' }}
                    >
                      Enable Two-Factor Authentication
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#FFF3E0'
                    }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#FF9800' }}>
                          Security Tips
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          • Use a strong password with at least 8 characters
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          • Enable two-factor authentication for extra security
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          • Never share your password with anyone
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          • Log out of your account when using shared devices
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

export default BuyerAccount;