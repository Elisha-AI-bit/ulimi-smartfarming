import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import zambianDemoData from '../utils/zambian-demo-data';

// Generate Zambian performance data
const generateZambianPerformanceData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    yield: Math.floor(Math.random() * 800 + 800), // Yield in kg
    efficiency: Math.floor(Math.random() * 30 + 70) // Efficiency percentage
  }));
};

// Generate Zambian pest data with local pests
const generateZambianPestData = () => {
  return [
    { name: 'Fall Armyworm', value: 45 },
    { name: 'Maize Stalk Borer', value: 25 },
    { name: 'Cassava Mosaic Disease', value: 20 },
    { name: 'Other Pests', value: 10 }
  ];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('performance');
  const [performanceData, setPerformanceData] = useState([]);
  const [pestData, setPestData] = useState([]);

  useEffect(() => {
    // Generate Zambian demo data
    setPerformanceData(generateZambianPerformanceData());
    setPestData(generateZambianPestData());
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Report Generator
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="report-type-label">Report Type</InputLabel>
            <Select
              labelId="report-type-label"
              value={reportType}
              label="Report Type"
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="performance">Performance Report</MenuItem>
              <MenuItem value="pest">Pest/Disease Report</MenuItem>
              <MenuItem value="marketplace">Marketplace Report</MenuItem>
              <MenuItem value="livestock">Livestock Report</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="contained">Generate Report</Button>
        </Box>
        
        {reportType === 'performance' && (
          <Box sx={{ width: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#8884d8" name="Yield (kg)" />
                <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
        
        {reportType === 'pest' && (
          <Box sx={{ width: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pestData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;