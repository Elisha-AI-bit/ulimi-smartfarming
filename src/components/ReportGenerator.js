import React, { useState } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock report data
const mockPerformanceData = [
  { month: 'Jan', yield: 1200, efficiency: 78 },
  { month: 'Feb', yield: 1350, efficiency: 82 },
  { month: 'Mar', yield: 1100, efficiency: 70 },
  { month: 'Apr', yield: 1450, efficiency: 88 },
  { month: 'May', yield: 1600, efficiency: 91 },
  { month: 'Jun', yield: 1500, efficiency: 85 },
];

const mockPestData = [
  { name: 'Aphids', value: 45 },
  { name: 'Caterpillars', value: 25 },
  { name: 'Fungal Disease', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('performance');

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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yield" fill="#8884d8" name="Yield (kg)" />
              <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {reportType === 'pest' && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPestData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mockPestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;