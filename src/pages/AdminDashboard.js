import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Storage as StorageIcon,
  Agriculture as AgricultureIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Import Zambian demo data generator
import zambianDemoDataGenerator from '../utils/zambian-demo-data';

// Generate Zambian-specific demo data
const generateDemoData = () => {
  // Generate users
  const users = zambianDemoDataGenerator.generateUsers(1248);
  const farmers = users.filter(user => user.role === 'farmer');
  const buyers = users.filter(user => user.role === 'buyer');
  const vendors = users.filter(user => user.role === 'vendor');
  
  // Generate farms
  const farms = zambianDemoDataGenerator.generateFarms(farmers, 342);
  
  // Generate sensor data points (simplified for dashboard)
  const dataPoints = farms.length * 30; // Approximate based on 30 days of data per farm
  
  // Generate orders
  const products = zambianDemoDataGenerator.generateProducts(vendors, 500);
  const orders = zambianDemoDataGenerator.generateOrders(buyers, products, 892);
  
  // Calculate total sales value
  const totalSalesValue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  
  return {
    users,
    farmers,
    farms,
    dataPoints,
    orders,
    products,
    totalSalesValue
  };
};

// Stats data with Zambian context
const getStatsData = (demoData) => [
  { 
    title: 'Total Users', 
    value: demoData.users.length.toLocaleString(), 
    icon: <PeopleIcon />, 
    color: '#2E7D32', 
    change: '+12% from last month',
    description: `${demoData.farmers.length} farmers, ${demoData.users.filter(u => u.role === 'buyer').length} buyers, ${demoData.users.filter(u => u.role === 'vendor').length} vendors`
  },
  { 
    title: 'Active Farms', 
    value: demoData.farms.length.toLocaleString(), 
    icon: <AgricultureIcon />, 
    color: '#66BB6A', 
    change: '+8% from last month',
    description: 'Across 10 Zambian provinces'
  },
  { 
    title: 'Data Points', 
    value: (demoData.dataPoints / 1000000).toFixed(1) + 'M', 
    icon: <StorageIcon />, 
    color: '#FBC02D', 
    change: '+15% from last month',
    description: 'IoT sensor readings'
  },
  { 
    title: 'Total Orders', 
    value: demoData.orders.length.toLocaleString(), 
    icon: <ShoppingCartIcon />, 
    color: '#2196F3', 
    change: '+22% from last month',
    description: 'From marketplace transactions'
  },
  { 
    title: 'Sales Value', 
    value: `K${(demoData.totalSalesValue / 1000).toFixed(1)}K`, 
    icon: <AttachMoneyIcon />, 
    color: '#9C27B0', 
    change: '+18% from last month',
    description: 'In Zambian Kwacha (ZMW)'
  },
];

// Generate user growth data with Zambian context
const getUserGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Generate data for the last 12 months
  return months.map((month, index) => {
    // Simulate growth pattern
    const baseUsers = Math.max(100, 200 + (index * 100));
    const users = Math.floor(baseUsers + (Math.random() * 200));
    const farms = Math.floor(users * 0.27 + (Math.random() * 50)); // ~27% of users are farmers
    
    return {
      month: month,
      users: users,
      farms: farms
    };
  });
};

// Generate system performance data
const getSystemPerformanceData = () => {
  const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
  
  return hours.map(time => ({
    time: time,
    cpu: Math.floor(Math.random() * 30) + 50, // 50-80%
    memory: Math.floor(Math.random() * 25) + 55, // 55-80%
    network: Math.floor(Math.random() * 40) + 60 // 60-100%
  }));
};

const AdminDashboard = () => {
  const [demoData, setDemoData] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [systemPerformanceData, setSystemPerformanceData] = useState([]);
  
  useEffect(() => {
    // Generate demo data on component mount
    const data = generateDemoData();
    setDemoData(data);
    
    // Generate chart data
    setUserGrowthData(getUserGrowthData());
    setSystemPerformanceData(getSystemPerformanceData());
  }, []);
  
  if (!demoData) {
    return <DashboardLayout>Loading Zambian demo data...</DashboardLayout>;
  }
  
  const statsData = getStatsData(demoData);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        {/* Welcome Banner */}
        <Box 
          sx={{ 
            backgroundColor: '#4caf50', 
            borderRadius: 2, 
            p: 3, 
            mb: 3, 
            color: 'white',
            backgroundImage: 'linear-gradient(to right, #4caf50, #2e7d32)'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Welcome to Admin Dashboard
          </Typography>
          <Typography variant="body2">
            System overview and performance metrics for Zambian agricultural operations. All systems operational.
          </Typography>
        </Box>
        
        {/* Stats Overview */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Key Metrics
          </Typography>
          <Grid container spacing={2}>
          {statsData.map((stat, index) => (
            <Grid key={index} xs={12} sm={6} md={4} lg={2.4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 2, 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ color: stat.color, mr: 0.5 }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.change}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#66BB6A'
                    }}>
                      <TrendingUpIcon />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {stat.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          </Grid>
        </Box>
        
        {/* Charts Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Dashboard Analytics
          </Typography>
          <Grid container spacing={2}>
          {/* User Growth Chart */}
          <Grid xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    User Growth (Zambia)
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <YAxis axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} 
                        formatter={(value) => [value.toLocaleString(), 'Count']}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        name="Total Users" 
                        stroke="#2196f3" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2} 
                        dot={{ stroke: '#2196f3', strokeWidth: 2, r: 4, fill: 'white' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="farms" 
                        name="Active Farms" 
                        stroke="#ff9800" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2} 
                        dot={{ stroke: '#ff9800', strokeWidth: 2, r: 4, fill: 'white' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* System Performance Chart */}
          <Grid xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    System Performance
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={systemPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="time" axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} />
                      <YAxis axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} 
                        formatter={(value) => [`${value}%`, 'Usage']}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar dataKey="cpu" name="CPU Usage" fill="#2196f3" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="memory" name="Memory Usage" fill="#ff9800" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="network" name="Network Usage" fill="#4caf50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        </Box>
        
        {/* Additional Information */}
        <Box sx={{ mt: 3 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Zambian Agricultural Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, backgroundColor: '#e8f5e9', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">Major Crops</Typography>
                    <Typography variant="h6">Maize, Cassava, Soybeans</Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, backgroundColor: '#fff3e0', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">Key Provinces</Typography>
                    <Typography variant="h6">Central, Copperbelt, Eastern</Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">Currency</Typography>
                    <Typography variant="h6">Zambian Kwacha (ZMW)</Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{ p: 2, backgroundColor: '#f3e5f5', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">Farming Systems</Typography>
                    <Typography variant="h6">Smallholder & Commercial</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default AdminDashboard;