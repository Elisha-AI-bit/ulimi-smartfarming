import React, { useState, useEffect } from 'react';
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
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  TableChart as TableChartIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import zambianDemoDataGenerator from '../utils/zambian-demo-data';

// Generate Zambian-specific sensor data
const generateZambianSensorData = () => {
  const sensorData = [];
  const now = new Date();
  
  // Generate data for the last 24 hours
  for (let i = 24; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    
    // Zambian-specific values for agricultural sensors
    const moisture = 42 + (Math.random() - 0.5) * 15; // 34-49% typical for Zambian soils
    const temperature = 24 + (Math.random() - 0.5) * 10; // 19-29°C typical for Zambia
    const humidity = 65 + (Math.random() - 0.5) * 25; // 52-77% typical
    const light = 300 + (Math.random() * 700); // 300-1000 lux (daytime values)
    const ph = 6.5 + (Math.random() - 0.5) * 1.0; // 6.0-7.0 optimal for most crops
    
    sensorData.push({
      time: date.toISOString().slice(11, 16), // HH:MM format
      moisture: parseFloat(moisture.toFixed(2)),
      temperature: parseFloat(temperature.toFixed(2)),
      humidity: parseFloat(humidity.toFixed(2)),
      light: parseFloat(light.toFixed(0)),
      ph: parseFloat(ph.toFixed(2))
    });
  }
  
  return sensorData;
};

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [viewTableOpen, setViewTableOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');

  useEffect(() => {
    // Generate demo data on component mount
    const data = generateZambianSensorData();
    setSensorData(data);
  }, []);

  const handleViewTable = () => {
    setViewTableOpen(true);
  };

  const handleCloseTable = () => {
    setViewTableOpen(false);
  };

  const getChartComponent = () => {
    // Filter data based on selected metric
    let filteredData = sensorData;
    if (selectedMetric !== 'all') {
      filteredData = sensorData.map(item => ({
        time: item.time,
        [selectedMetric]: item[selectedMetric]
      }));
    }
    
    if (chartType === 'bar') {
      return (
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetric === 'all' || selectedMetric === 'moisture' ? <Bar dataKey="moisture" fill="#2e7d32" name="Soil Moisture (%)" /> : null}
          {selectedMetric === 'all' || selectedMetric === 'temperature' ? <Bar dataKey="temperature" fill="#ff9800" name="Temperature (°C)" /> : null}
          {selectedMetric === 'all' || selectedMetric === 'humidity' ? <Bar dataKey="humidity" fill="#2196f3" name="Humidity (%)" /> : null}
          {selectedMetric === 'all' || selectedMetric === 'light' ? <Bar dataKey="light" fill="#9c27b0" name="Light Intensity (lux)" /> : null}
          {selectedMetric === 'all' || selectedMetric === 'ph' ? <Bar dataKey="ph" fill="#f44336" name="Soil pH" /> : null}
        </BarChart>
      );
    } else {
      return (
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetric === 'all' || selectedMetric === 'moisture' ? <Line type="monotone" dataKey="moisture" stroke="#2e7d32" name="Soil Moisture (%)" strokeWidth={2} /> : null}
          {selectedMetric === 'all' || selectedMetric === 'temperature' ? <Line type="monotone" dataKey="temperature" stroke="#ff9800" name="Temperature (°C)" strokeWidth={2} /> : null}
          {selectedMetric === 'all' || selectedMetric === 'humidity' ? <Line type="monotone" dataKey="humidity" stroke="#2196f3" name="Humidity (%)" strokeWidth={2} /> : null}
          {selectedMetric === 'all' || selectedMetric === 'light' ? <Line type="monotone" dataKey="light" stroke="#9c27b0" name="Light Intensity (lux)" strokeWidth={2} /> : null}
          {selectedMetric === 'all' || selectedMetric === 'ph' ? <Line type="monotone" dataKey="ph" stroke="#f44336" name="Soil pH" strokeWidth={2} /> : null}
        </LineChart>
      );
    }
  };

  const getStatusChip = (value, metric) => {
    // Simple logic to determine status based on metric with Zambian agricultural context
    switch(metric) {
      case 'moisture':
        if (value < 30) return <Chip label="Low" size="small" color="warning" />;
        if (value > 55) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'temperature':
        if (value < 18) return <Chip label="Low" size="small" color="warning" />;
        if (value > 32) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'humidity':
        if (value < 50) return <Chip label="Low" size="small" color="warning" />;
        if (value > 80) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'ph':
        if (value < 5.5) return <Chip label="Acidic" size="small" color="warning" />;
        if (value > 7.5) return <Chip label="Alkaline" size="small" color="warning" />;
        return <Chip label="Optimal" size="small" color="success" />;
      case 'light':
        if (value < 200) return <Chip label="Low" size="small" color="warning" />;
        if (value > 800) return <Chip label="High" size="small" color="warning" />;
        return <Chip label="Good" size="small" color="success" />;
      default:
        return <Chip label="Normal" size="small" color="success" />;
    }
  };

  // Get the latest sensor readings
  const latestReadings = sensorData.length > 0 ? sensorData[sensorData.length - 1] : {};

  return (
    <DashboardLayout userRole="farmer" userName="Mwansa Mwanza">
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500, mr: 2 }}>
            Sensor Data - Maize Farm
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<TableChartIcon />}
            onClick={handleViewTable}
            sx={{ 
              borderColor: '#2e7d32',
              color: '#2e7d32',
              mt: { xs: 1, sm: 0 }
            }}
          >
            View Data Table
          </Button>
        </Box>
        
        {/* Farm Information */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)', backgroundColor: '#e8f5e9' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Farm Location
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Plot 45, Chilanga, Lusaka Province, Zambia
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Elevation: 1275m above sea level
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)', backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Current Conditions
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Rainy Season - Week 8
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Maize Growth Stage: Tasseling
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
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
                  {Object.entries(latestReadings).map(([key, value]) => {
                    if (key === 'time') return null;
                    return (
                      <Grid item xs={6} sm={4} key={key}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Sensor Data Overview (Last 24 Hours)
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      {React.cloneElement(getChartComponent(), {
                        children: [
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" key="grid" />,
                          <XAxis dataKey="time" axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} key="xAxis" />,
                          <YAxis axisLine={{ stroke: '#e0e0e0' }} tick={{ fill: '#333333' }} key="yAxis" />,
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }} 
                            formatter={(value, name) => {
                              if (name === 'temperature') return [`${value}°C`, name];
                              if (name === 'moisture' || name === 'humidity') return [`${value}%`, name];
                              if (name === 'light') return [`${value} lux`, name];
                              if (name === 'ph') return [value, name];
                              return [value, name];
                            }}
                            key="tooltip" 
                          />,
                          <Legend wrapperStyle={{ paddingTop: '10px' }} key="legend" />,
                          ...React.Children.toArray(getChartComponent().props.children).filter(child => 
                            child.type !== CartesianGrid && 
                            child.type !== XAxis && 
                            child.type !== YAxis && 
                            child.type !== Tooltip && 
                            child.type !== Legend
                          ).map((line, i) => {
                            if (line.type === Line) {
                              return React.cloneElement(line, {
                                strokeWidth: 2,
                                dot: { stroke: line.props.stroke, strokeWidth: 2, r: 4, fill: 'white' },
                                activeDot: { r: 8 },
                                key: `line-${i}`
                              });
                            }
                            return line;
                          })
                        ]
                      })}
                    </ResponsiveContainer>
                  </Box>
                </Box>
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
            Sensor Data Table - Maize Farm (Lusaka)
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
                    <TableCell align="right">
                      {row.ph}
                      {getStatusChip(row.ph, 'ph')}
                    </TableCell>
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