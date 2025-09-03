import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Lock as LockIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminSecuritySettings = () => {
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          Security Settings
        </Typography>
        
        <Grid container spacing={3}>
          {/* Role Management */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Role Management
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select label="Role" defaultValue="">
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="farmer">Farmer</MenuItem>
                        <MenuItem value="buyer">Buyer</MenuItem>
                        <MenuItem value="vendor">Vendor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Permission Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}>
                      Add Permission
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Authentication Settings */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LockIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Authentication Settings
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Two-Factor Authentication"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Require Strong Passwords"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Session Timeout (minutes)" type="number" defaultValue="30" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}>
                      Save Settings
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Audit Logs */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HistoryIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Audit Logs
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Search Logs" placeholder="Filter by user, action, or date..." />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ height: 300, overflow: 'auto', border: '1px solid #E0E0E0', borderRadius: 2, p: 2 }}>
                      <Typography variant="body2">No audit logs available</Typography>
                    </Box>
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

export default AdminSecuritySettings;