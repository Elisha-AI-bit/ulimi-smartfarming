import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Payment as PaymentIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminPayments = () => {
  // Mock payment data
  const paymentData = [
    { id: 1, user: 'John Farmer', type: 'Product Sale', amount: 'K45.50', date: '2023-06-15', status: 'Completed' },
    { id: 2, user: 'Green Veggies Co.', type: 'Subscription', amount: 'K25.00', date: '2023-06-14', status: 'Completed' },
    { id: 3, user: 'Mary Buyer', type: 'Product Purchase', amount: 'K32.75', date: '2023-06-14', status: 'Pending' },
    { id: 4, user: 'Farm Fresh Ltd.', type: 'Product Sale', amount: 'K67.20', date: '2023-06-13', status: 'Completed' },
    { id: 5, user: 'Tom Vendor', type: 'Commission', amount: 'K5.30', date: '2023-06-12', status: 'Completed' },
  ];

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2E7D32', fontWeight: 500 }}>
          Payment Overview
        </Typography>
        
        <Grid container spacing={3}>
          {/* Payment Summary */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      K1,245.50
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +12% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Pending Payments
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 500 }}>
                      $245.30
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                      5 payments
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Completed Today
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      $187.25
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      3 transactions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Commission Earned
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      $89.45
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                      +8% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Payment Filters and Actions */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaymentIcon sx={{ mr: 1, color: '#2E7D32' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                      Payment Transactions
                    </Typography>
                  </Box>
                  <Box>
                    <Button 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      sx={{ mr: 1, borderColor: '#2E7D32', color: '#2E7D32' }}
                    >
                      Export
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<FilterIcon />}
                      sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                    >
                      Filter
                    </Button>
                  </Box>
                </Box>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={3}>
                    <TextField fullWidth label="Start Date" type="date" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField fullWidth label="End Date" type="date" InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select label="Status" defaultValue="">
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField fullWidth label="User/Transaction ID" placeholder="Search..." />
                  </Grid>
                </Grid>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#2E7D32' }}>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Transaction ID</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>User</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentData.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>#{payment.id}</TableCell>
                          <TableCell>{payment.user}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <span style={{ 
                              color: payment.status === 'Completed' ? '#4CAF50' : '#FF9800',
                              fontWeight: 'bold'
                            }}>
                              {payment.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default AdminPayments;