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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const Reports = () => {
  const [reportType, setReportType] = useState('farm');
  const [dateRange, setDateRange] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewReportOpen, setViewReportOpen] = useState(false);

  // Mock report data
  const reportData = [
    { 
      id: 1, 
      name: 'Farm Performance Report', 
      type: 'Farm', 
      date: '2023-05-15', 
      status: 'Generated',
      details: {
        period: 'May 2023',
        crops: ['Maize', 'Beans', 'Cassava'],
        yield: '1,250 kg',
        revenue: 'K2,450',
        expenses: 'K850',
        profit: 'K1,600'
      }
    },
    { 
      id: 2, 
      name: 'Crop Yield Analysis', 
      type: 'Crop', 
      date: '2023-05-10', 
      status: 'Generated',
      details: {
        period: 'April-May 2023',
        crops: ['Maize', 'Beans'],
        yield: '850 kg',
        growthRate: '12% increase',
        recommendations: 'Continue with current irrigation schedule'
      }
    },
    { 
      id: 3, 
      name: 'Financial Summary', 
      type: 'Financial', 
      date: '2023-05-05', 
      status: 'Generated',
      details: {
        period: 'Q2 2023',
        revenue: 'K5,200',
        expenses: 'K2,100',
        profit: 'K3,100',
        roi: '42%'
      }
    },
    { 
      id: 4, 
      name: 'Irrigation Efficiency', 
      type: 'Irrigation', 
      date: '2023-04-28', 
      status: 'Generated',
      details: {
        period: 'April 2023',
        waterUsed: '15,000 L',
        efficiency: '87%',
        savings: '12% compared to last month'
      }
    },
    { 
      id: 5, 
      name: 'Pest Control Report', 
      type: 'Pest', 
      date: '2023-04-22', 
      status: 'Pending',
      details: {
        period: 'April 2023',
        pestsDetected: 'Aphids, Armyworms',
        treatment: 'In progress',
        effectiveness: 'N/A'
      }
    },
  ];

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'generated': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewReportOpen(true);
  };

  const handleCloseViewReport = () => {
    setViewReportOpen(false);
    setSelectedReport(null);
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500, mr: 2 }}>
            Reports
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1,
            mt: { xs: 1, sm: 0 }
          }}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{ 
                mr: { xs: 0, sm: 1 }, 
                mb: { xs: 1, sm: 0 },
                borderColor: '#2e7d32', 
                color: '#2e7d32' 
              }}
            >
              Print All
            </Button>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              sx={{ 
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Share Reports
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={2}>
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
                  <Grid item xs={12} sm={4}>
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
                  
                  <Grid item xs={12} sm={4}>
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
                  
                  <Grid item xs={12} sm={4}>
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
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2
                          }}>
                            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                              <Typography variant="h6">
                                {report.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
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
                            <Box sx={{ 
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              gap: 1,
                              width: { xs: '100%', sm: 'auto' }
                            }}>
                              <Button 
                                size="small"
                                startIcon={<VisibilityIcon />}
                                onClick={() => handleViewReport(report)}
                                sx={{ mr: { xs: 0, sm: 1 }, mb: { xs: 1, sm: 0 } }}
                                fullWidth={window.innerWidth < 600}
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
                                fullWidth={window.innerWidth < 600}
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

      {/* View Report Dialog */}
      <Dialog open={viewReportOpen} onClose={handleCloseViewReport} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedReport?.name}
            </Typography>
            <Button onClick={handleCloseViewReport} startIcon={<CloseIcon />}>
              Close
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={selectedReport.type} 
                  size="small" 
                  sx={{ mr: 1, backgroundColor: '#2e7d3220', color: '#2e7d32' }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                  Generated on: {selectedReport.date}
                </Typography>
                <Chip 
                  label={selectedReport.status} 
                  color={getStatusColor(selectedReport.status)} 
                  size="small"
                />
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                Report Details
              </Typography>
              
              <List>
                {Object.entries(selectedReport.details).map(([key, value], index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemText 
                      primary={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
                      secondary={Array.isArray(value) ? value.join(', ') : value}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<PrintIcon />}
                  sx={{ mr: 1, borderColor: '#2e7d32', color: '#2e7d32' }}
                >
                  Print Report
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Download PDF
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Reports;