import React, { useState, useEffect } from 'react';
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
import zambianDemoData from '../utils/zambian-demo-data';

// Generate Zambian sales data
const generateZambianSalesData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    sales: Math.floor(Math.random() * 5000) + 2000, // Sales in ZMW
    orders: Math.floor(Math.random() * 200) + 80
  }));
};

// Generate Zambian category data with local products
const generateZambianCategoryData = () => {
  return [
    { name: 'Maize', value: 35 },
    { name: 'Cassava', value: 25 },
    { name: 'Sweet Potatoes', value: 20 },
    { name: 'Rice', value: 10 },
    { name: 'Other Crops', value: 10 }
  ];
};

// Generate recent orders with Zambian context
const generateZambianOrders = () => {
  const customers = ['Mwansa Mwale', 'Chiluba Banda', 'Nchimunya Kaunda', 'Mukanjila Phiri'];
  const products = ['Maize (100kg)', 'Cassava (50kg)', 'Sweet Potatoes (30kg)', 'Rice (25kg)'];
  const statuses = ['Delivered', 'Processing', 'Shipped'];
  
  return [
    { id: 1, customer: customers[0], product: products[0], amount: 'K249.99', status: statuses[0] },
    { id: 2, customer: customers[1], product: products[1], amount: 'K159.99', status: statuses[1] },
    { id: 3, customer: customers[2], product: products[2], amount: 'K179.99', status: statuses[2] },
    { id: 4, customer: customers[3], product: products[3], amount: 'K99.99', status: statuses[0] },
  ];
};

const COLORS = ['#2e7d32', '#4caf50', '#82ca9d', '#ff9800', '#ffeb3b'];

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Generate Zambian demo data
    setSalesData(generateZambianSalesData());
    setCategoryData(generateZambianCategoryData());
    setRecentOrders(generateZambianOrders());
    
    // Also use some data from the zambianDemoData generator
    const users = zambianDemoData.generateUsers(10);
    const farms = zambianDemoData.generateFarms(users, 5);
  }, []);

  // Calculate totals from the data
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0;

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
                  K{totalSales.toLocaleString()}
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
                  {totalOrders}
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
                  K{avgOrderValue}
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
                <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'sales') return [`K${value}`, 'Sales'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#2e7d32" name="Sales (K)" />
                      <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
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
                <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
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
                </Box>
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
                  {recentOrders.map((order) => (
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