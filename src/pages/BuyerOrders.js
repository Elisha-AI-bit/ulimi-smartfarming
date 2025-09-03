import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const BuyerOrders = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock order data
  const orders = [
    { 
      id: '#ORD-001', 
      product: 'Fresh Maize (100kg)', 
      vendor: 'Green Farms Co.', 
      date: '2023-06-15', 
      amount: 'K45.50', 
      status: 'Delivered',
      deliveryDate: '2023-06-17'
    },
    { 
      id: '#ORD-002', 
      product: 'Organic Beans (50kg)', 
      vendor: 'Healthy Harvest', 
      date: '2023-06-14', 
      amount: 'K32.75', 
      status: 'Shipped',
      deliveryDate: '2023-06-16'
    },
    { 
      id: '#ORD-003', 
      product: 'Fresh Tomatoes (30kg)', 
      vendor: 'Farm Fresh Ltd.', 
      date: '2023-06-12', 
      amount: 'K28.30', 
      status: 'Processing',
      deliveryDate: '2023-06-15'
    },
    { 
      id: '#ORD-004', 
      product: 'Premium Maize (150kg)', 
      vendor: 'Agro Co.', 
      date: '2023-06-10', 
      amount: 'K67.20', 
      status: 'Delivered',
      deliveryDate: '2023-06-13'
    },
    { 
      id: '#ORD-005', 
      product: 'Organic Beans (40kg)', 
      vendor: 'Natural Farms', 
      date: '2023-06-08', 
      amount: 'K26.40', 
      status: 'Cancelled',
      deliveryDate: ''
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#4CAF50';
      case 'Shipped': return '#2196F3';
      case 'Processing': return '#FF9800';
      case 'Cancelled': return '#E53935';
      default: return '#9E9E9E';
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            My Orders
          </Typography>
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
        
        <Grid container spacing={3}>
          {/* Order Summary */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  backgroundColor: '#F5F5F5'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Total Orders
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      24
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                      +3 from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  backgroundColor: '#F5F5F5'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Delivered
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                      18
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                      75% of orders
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  backgroundColor: '#F5F5F5'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      In Progress
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 500 }}>
                      5
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                      Processing & Shipping
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  backgroundColor: '#F5F5F5'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000', mb: 1 }}>
                      Total Spent
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      K425.60
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                      This month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Orders Table */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartIcon sx={{ mr: 1, color: '#2E7D32' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                      Order History
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      size="small"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ mr: 2 }}
                      InputProps={{
                        endAdornment: <SearchIcon />
                      }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filter}
                        label="Status"
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <MenuItem value="all">All Orders</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#2E7D32' }}>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Order ID</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Product</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Vendor</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Delivery Date</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell sx={{ fontWeight: 'bold' }}>{order.id}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.vendor}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>{order.amount}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status} 
                              size="small" 
                              sx={{ 
                                backgroundColor: getStatusColor(order.status),
                                color: '#FFFFFF'
                              }} 
                            />
                          </TableCell>
                          <TableCell>{order.deliveryDate}</TableCell>
                          <TableCell>
                            <IconButton size="small" sx={{ color: '#2E7D32' }}>
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Order Tracking */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingCartIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Track Your Order
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Enter Order ID"
                      placeholder="e.g., #ORD-001"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF', py: 1.5 }}
                    >
                      Track Order
                    </Button>
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

export default BuyerOrders;