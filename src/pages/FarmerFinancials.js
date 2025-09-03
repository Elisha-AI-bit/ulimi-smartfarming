import React, { useState, useEffect } from 'react';
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
  MenuItem
} from '@mui/material';
import { 
  BarChart as BarChartIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import zambianDemoData from '../utils/zambian-demo-data';

// Generate Zambian financial data
const generateZambianRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 8000) + 3000, // Revenue in ZMW
    expenses: Math.floor(Math.random() * 5000) + 1500  // Expenses in ZMW
  }));
};

// Generate Zambian crop profitability data
const generateZambianCropProfitData = () => {
  return [
    { name: 'Maize', value: 45 },
    { name: 'Cassava', value: 25 },
    { name: 'Sweet Potatoes', value: 20 },
    { name: 'Rice', value: 10 }
  ];
};

// Generate Zambian sales data
const generateZambianSalesData = () => {
  return [
    { id: 1, product: 'Maize (100kg)', date: '2023-06-15', amount: 'K455.00', customer: 'John Mwale' },
    { id: 2, product: 'Cassava (50kg)', date: '2023-06-14', amount: 'K327.50', customer: 'Mary Banda' },
    { id: 3, product: 'Sweet Potatoes (30kg)', date: '2023-06-12', amount: 'K283.00', customer: 'Peter Kaunda' },
    { id: 4, product: 'Maize (150kg)', date: '2023-06-10', amount: 'K672.00', customer: 'Agro Co. Ltd' },
    { id: 5, product: 'Cassava (40kg)', date: '2023-06-08', amount: 'K264.00', customer: 'Jane Phiri' },
  ];
};

const COLORS = ['#2E7D32', '#66BB6A', '#FBC02D', '#9E9E9E'];

const FarmerFinancials = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [cropProfitData, setCropProfitData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Generate Zambian demo data
    setRevenueData(generateZambianRevenueData());
    setCropProfitData(generateZambianCropProfitData());
    setSalesData(generateZambianSalesData());
  }, []);

  // Calculate financial metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            Financial Insights
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{ mr: 1, borderColor: '#2E7D32', color: '#2E7D32' }}
            >
              Export Report
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
          {/* Financial Summary */}
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
                      Total Revenue
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      K{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        +12% from last month
                      </Typography>
                    </Box>
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
                      Total Expenses
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#E53935', fontWeight: 500 }}>
                      K{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingDownIcon sx={{ color: '#E53935', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#E53935' }}>
                        -5% from last month
                      </Typography>
                    </Box>
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
                      Net Profit
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      K{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        +18% from last month
                      </Typography>
                    </Box>
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
                      Profit Margin
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#2E7D32', fontWeight: 500 }}>
                      {profitMargin}%
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: '#4CAF50' }}>
                        +3% from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Revenue vs Expenses Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChartIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Revenue vs Expenses (Last 12 Months)
                  </Typography>
                </Box>
                
                <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`K${value}`, 'Amount']}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue (K)" fill="#2E7D32" />
                      <Bar dataKey="expenses" name="Expenses (K)" fill="#E53935" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Crop Profitability Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChartIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Crop Profitability
                  </Typography>
                </Box>
                
                <Box sx={{ width: '100%', minHeight: { xs: 250, sm: 300, md: 350 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cropProfitData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {cropProfitData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Profitability']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Recent Sales */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BarChartIcon sx={{ mr: 1, color: '#2E7D32' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                      Recent Sales
                    </Typography>
                  </Box>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                      value={filter}
                      label="Filter"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Time</MenuItem>
                      <MenuItem value="month">This Month</MenuItem>
                      <MenuItem value="week">This Week</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#2E7D32' }}>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Product</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Customer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {salesData.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>{sale.product}</TableCell>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: '#2E7D32' }}>{sale.amount}</TableCell>
                          <TableCell>{sale.customer}</TableCell>
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

export default FarmerFinancials;