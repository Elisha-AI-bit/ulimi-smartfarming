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
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminAnnouncements = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRoles, setTargetRoles] = useState([]);
  const [urgent, setUrgent] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  
  // Mock announcement data
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2 AM - 4 AM', date: '2023-06-10', urgent: false },
    { id: 2, title: 'New Feature Release', message: 'We\'ve added a new crop recommendation feature', date: '2023-06-05', urgent: false },
    { id: 3, title: 'Urgent: Weather Alert', message: 'Severe weather warning for all regions', date: '2023-06-01', urgent: true },
  ]);

  const handleRoleChange = (role) => {
    if (targetRoles.includes(role)) {
      setTargetRoles(targetRoles.filter(r => r !== role));
    } else {
      setTargetRoles([...targetRoles, role]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the announcement
    alert('Announcement sent successfully!');
    // Reset form
    setTitle('');
    setMessage('');
    setTargetRoles([]);
    setUrgent(false);
    setScheduled(false);
    setScheduleDate('');
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          Send Announcements
        </Typography>
        
        <Grid container spacing={3}>
          {/* Send Announcement Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Create New Announcement
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Target Audience
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={targetRoles.includes('farmer')}
                                onChange={() => handleRoleChange('farmer')}
                              />
                            }
                            label="Farmers"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={targetRoles.includes('buyer')}
                                onChange={() => handleRoleChange('buyer')}
                              />
                            }
                            label="Buyers"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={targetRoles.includes('vendor')}
                                onChange={() => handleRoleChange('vendor')}
                              />
                            }
                            label="Vendors"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                checked={targetRoles.includes('all')}
                                onChange={() => handleRoleChange('all')}
                              />
                            }
                            label="All Users"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={urgent}
                            onChange={(e) => setUrgent(e.target.checked)}
                          />
                        }
                        label="Mark as Urgent"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={scheduled}
                            onChange={(e) => setScheduled(e.target.checked)}
                          />
                        }
                        label="Schedule for Later"
                      />
                    </Grid>
                    
                    {scheduled && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Schedule Date & Time"
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Button 
                        type="submit"
                        variant="contained" 
                        startIcon={<SendIcon />}
                        fullWidth
                        sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF', py: 1.5 }}
                      >
                        Send Announcement
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Announcement History */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Announcement History
                  </Typography>
                </Box>
                
                <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                  {announcements.map((announcement) => (
                    <React.Fragment key={announcement.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {announcement.title}
                              </Typography>
                              {announcement.urgent && (
                                <Box sx={{ 
                                  backgroundColor: '#E53935', 
                                  color: '#FFFFFF', 
                                  borderRadius: 1, 
                                  px: 1, 
                                  py: 0.5, 
                                  ml: 1,
                                  fontSize: '0.75rem'
                                }}>
                                  URGENT
                                </Box>
                              )}
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: 'block', color: 'text.primary', mb: 1 }}
                              >
                                {announcement.message}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9E9E9E' }}>
                                Sent on {announcement.date}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default AdminAnnouncements;