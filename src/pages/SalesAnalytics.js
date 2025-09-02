import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Chip,
  Button
} from '@mui/material';
import { 
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for sales
const mockSalesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 139 },
  { month: 'Mar', sales: 2000, orders: 180 },
  { month: 'Apr', sales: 2780, orders: 190 },
  { month: 'May', sales: 1890, orders: 120 },
  { month: 'Jun', sales: 2390, orders: 170 },
];

// Mock data for product categories
const mockCategoryData = [
  { name: 'Vegetables', value: 400 },
  { name: 'Fruits', value: 300 },
  { name: 'Dairy', value: 300 },
  { name: 'Meat', value: 200 },
  { name: 'Grains', value: 100 },
];

const COLORS = ['#2e7d32', '#4caf50', '#82ca9d', '#ff9800', '#ffeb3b'];

const SalesAnalytics = () => {
  const [salesData] = useState(mockSalesData);
  const [categoryData] = useState(mockCategoryData);

  return (
    <DashboardLayout userRole="vendor" userName="Vendor">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Sales Analytics
        </Typography>
        
        <Grid container spacing={3}>
          {/* Stats Overview */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoneyIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Total Sales
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                  $1,245
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingCartIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Total Orders
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                  142
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +8% from last month
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Avg. Order Value
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                  $8.76
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +5% from last month
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Conversion Rate
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                  3.2%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  +1.2% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Sales Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Monthly Sales Performance
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#2e7d32" name="Sales ($)" />
                    <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Category Distribution */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Product Category Distribution
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingCartIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Recent Orders
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {[
                    { id: 1, customer: 'John Doe', product: 'Organic Tomatoes', amount: '$24.99', status: 'Delivered' },
                    { id: 2, customer: 'Jane Smith', product: 'Free Range Eggs', amount: '$15.99', status: 'Processing' },
                    { id: 3, customer: 'Bob Johnson', product: 'Honey', amount: '$17.99', status: 'Shipped' },
                    { id: 4, customer: 'Alice Brown', product: 'Fresh Carrots', amount: '$9.99', status: 'Delivered' },
                  ].map((order) => (
                    <Grid item xs={12} sm={6} md={3} key={order.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Order #{order.id}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {order.customer}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {order.product}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {order.amount}
                          </Typography>
                          <Chip 
                            label={order.status} 
                            size="small" 
                            color={order.status === 'Delivered' ? 'success' : order.status === 'Processing' ? 'warning' : 'info'}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    mt: 2,
                    borderColor: '#2e7d32',
                    color: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.04)'
                    }
                  }}
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default SalesAnalytics;