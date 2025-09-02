import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { 
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const Reports = () => {
  const [reportType, setReportType] = useState('farm');
  const [dateRange, setDateRange] = useState('monthly');

  // Mock report data
  const reportData = [
    { id: 1, name: 'Farm Performance Report', type: 'Farm', date: '2023-05-15', status: 'Generated' },
    { id: 2, name: 'Crop Yield Analysis', type: 'Crop', date: '2023-05-10', status: 'Generated' },
    { id: 3, name: 'Financial Summary', type: 'Financial', date: '2023-05-05', status: 'Generated' },
    { id: 4, name: 'Irrigation Efficiency', type: 'Irrigation', date: '2023-04-28', status: 'Generated' },
    { id: 5, name: 'Pest Control Report', type: 'Pest', date: '2023-04-22', status: 'Pending' },
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'generated': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Reports
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Generate New Report
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Report Type</InputLabel>
                      <Select
                        value={reportType}
                        label="Report Type"
                        onChange={(e) => setReportType(e.target.value)}
                      >
                        <MenuItem value="farm">Farm Performance</MenuItem>
                        <MenuItem value="crop">Crop Yield</MenuItem>
                        <MenuItem value="financial">Financial Summary</MenuItem>
                        <MenuItem value="irrigation">Irrigation Efficiency</MenuItem>
                        <MenuItem value="pest">Pest Control</MenuItem>
                        <MenuItem value="weather">Weather Impact</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Date Range</InputLabel>
                      <Select
                        value={dateRange}
                        label="Date Range"
                        onChange={(e) => setDateRange(e.target.value)}
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ 
                        height: '100%',
                        backgroundColor: '#2e7d32',
                        '&:hover': {
                          backgroundColor: '#1b5e20'
                        }
                      }}
                    >
                      Generate Report
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Generated Reports
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {reportData.map((report) => (
                    <Grid item xs={12} key={report.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="h6">
                                {report.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Chip 
                                  label={report.type} 
                                  size="small" 
                                  sx={{ mr: 1, backgroundColor: '#2e7d3220', color: '#2e7d32' }}
                                />
                                <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                                  {report.date}
                                </Typography>
                                <Chip 
                                  label={report.status} 
                                  color={getStatusColor(report.status)} 
                                  size="small"
                                />
                              </Box>
                            </Box>
                            <Box>
                              <Button 
                                size="small"
                                startIcon={<VisibilityIcon />}
                                sx={{ mr: 1 }}
                              >
                                View
                              </Button>
                              <Button 
                                size="small"
                                startIcon={<DownloadIcon />}
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
                                Download
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Reports;