import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  TableChart as TableChartIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for sensor readings
const mockSensorData = [
  { time: '00:00', moisture: 45, temperature: 22, humidity: 65, light: 15, ph: 6.8 },
  { time: '04:00', moisture: 42, temperature: 21, humidity: 68, light: 10, ph: 6.7 },
  { time: '08:00', moisture: 38, temperature: 24, humidity: 70, light: 45, ph: 6.9 },
  { time: '12:00', moisture: 35, temperature: 28, humidity: 62, light: 85, ph: 7.0 },
  { time: '16:00', moisture: 37, temperature: 27, humidity: 60, light: 75, ph: 6.8 },
  { time: '20:00', moisture: 40, temperature: 24, humidity: 63, light: 30, ph: 6.7 },
  { time: '00:00', moisture: 43, temperature: 23, humidity: 66, light: 12, ph: 6.8 },
  { time: '04:00', moisture: 41, temperature: 22, humidity: 67, light: 8, ph: 6.9 },
  { time: '08:00', moisture: 39, temperature: 25, humidity: 69, light: 50, ph: 7.0 },
  { time: '12:00', moisture: 36, temperature: 29, humidity: 61, light: 90, ph: 6.8 },
  { time: '16:00', moisture: 38, temperature: 26, humidity: 59, light: 80, ph: 6.7 },
  { time: '20:00', moisture: 42, temperature: 23, humidity: 64, light: 35, ph: 6.8 },
];

const SensorData = () => {
  const [sensorData] = useState(mockSensorData);
  const [chartType, setChartType] = useState('line');
  const [viewTableOpen, setViewTableOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  const handleViewTable = () => {
    setViewTableOpen(true);
  };

  const handleCloseTable = () => {
    setViewTableOpen(false);
  };

  const getChartComponent = () => {
    if (chartType === 'bar') {
      return (
        <BarChart data={sensorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="moisture" fill="#2e7d32" name="Soil Moisture (%)" />
          <Bar dataKey="temperature" fill="#ff9800" name="Temperature (°C)" />
          <Bar dataKey="humidity" fill="#2196f3" name="Humidity (%)" />
          <Bar dataKey="light" fill="#9c27b0" name="Light Intensity (lux)" />
          <Bar dataKey="ph" fill="#f44336" name="Soil pH" />
        </BarChart>
      );
    } else {
      return (
        <LineChart data={sensorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="moisture" stroke="#2e7d32" name="Soil Moisture (%)" strokeWidth={2} />
          <Line type="monotone" dataKey="temperature" stroke="#ff9800" name="Temperature (°C)" strokeWidth={2} />
          <Line type="monotone" dataKey="humidity" stroke="#2196f3" name="Humidity (%)" strokeWidth={2} />
          <Line type="monotone" dataKey="light" stroke="#9c27b0" name="Light Intensity (lux)" strokeWidth={2} />
          <Line type="monotone" dataKey="ph" stroke="#f44336" name="Soil pH" strokeWidth={2} />
        </LineChart>
      );
    }
  };

  const getStatusChip = (value, metric) => {
    // Simple logic to determine status based on metric
    switch(metric) {
      case 'moisture':
        if (value < 30) return <Chip label="Low" size="small" color="warning" />;
        if (value > 50) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'temperature':
        if (value < 20) return <Chip label="Low" size="small" color="warning" />;
        if (value > 30) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'humidity':
        if (value < 50) return <Chip label="Low" size="small" color="warning" />;
        if (value > 70) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      default:
        return <Chip label="Normal" size="small" color="success" />;
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500 }}>
            Sensor Data
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<TableChartIcon />}
            onClick={handleViewTable}
            sx={{ 
              borderColor: '#2e7d32',
              color: '#2e7d32'
            }}
          >
            View Data Table
          </Button>
        </Box>
        
        {/* Controls */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShowChartIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Chart Controls
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Chart Type</InputLabel>
                      <Select
                        value={chartType}
                        label="Chart Type"
                        onChange={(e) => setChartType(e.target.value)}
                      >
                        <MenuItem value="line">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ShowChartIcon sx={{ mr: 1 }} />
                            Line Chart
                          </Box>
                        </MenuItem>
                        <MenuItem value="bar">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BarChartIcon sx={{ mr: 1 }} />
                            Bar Chart
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>View Metric</InputLabel>
                      <Select
                        value={selectedMetric}
                        label="View Metric"
                        onChange={(e) => setSelectedMetric(e.target.value)}
                      >
                        <MenuItem value="all">All Metrics</MenuItem>
                        <MenuItem value="moisture">Soil Moisture</MenuItem>
                        <MenuItem value="temperature">Temperature</MenuItem>
                        <MenuItem value="humidity">Humidity</MenuItem>
                        <MenuItem value="light">Light Intensity</MenuItem>
                        <MenuItem value="ph">Soil pH</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Current Readings
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {Object.entries(sensorData[sensorData.length - 1] || {}).map(([key, value]) => {
                    if (key === 'time') return null;
                    return (
                      <Grid item xs={6} sm={4} key={key}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {value} {key === 'temperature' ? '°C' : key === 'moisture' || key === 'humidity' ? '%' : key === 'light' ? 'lux' : key === 'ph' ? '' : ''}
                            </Typography>
                            {getStatusChip(value, key)}
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Sensor Data Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Sensor Data Overview
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height={400}>
                  {getChartComponent()}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Data Table Dialog */}
      <Dialog open={viewTableOpen} onClose={handleCloseTable} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TableChartIcon sx={{ mr: 1, color: '#2e7d32' }} />
            Sensor Data Table
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sensor data table">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Soil Moisture (%)</TableCell>
                  <TableCell align="right">Temperature (°C)</TableCell>
                  <TableCell align="right">Humidity (%)</TableCell>
                  <TableCell align="right">Light Intensity (lux)</TableCell>
                  <TableCell align="right">Soil pH</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorData.map((row, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.time}
                    </TableCell>
                    <TableCell align="right">
                      {row.moisture}
                      {getStatusChip(row.moisture, 'moisture')}
                    </TableCell>
                    <TableCell align="right">
                      {row.temperature}
                      {getStatusChip(row.temperature, 'temperature')}
                    </TableCell>
                    <TableCell align="right">
                      {row.humidity}
                      {getStatusChip(row.humidity, 'humidity')}
                    </TableCell>
                    <TableCell align="right">{row.light}</TableCell>
                    <TableCell align="right">{row.ph}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTable}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default SensorData;