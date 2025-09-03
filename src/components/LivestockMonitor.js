import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import zambianDemoData from '../utils/zambian-demo-data';

// Generate Zambian livestock data
const generateZambianLivestock = () => {
  return [
    { id: 1, name: 'Bessie', type: 'Cattle', breed: 'Angoni', age: 3, weight: 650, health: 'Healthy' },
    { id: 2, name: 'Dolly', type: 'Sheep', breed: 'Southdown', age: 2, weight: 75, health: 'Healthy' },
    { id: 3, name: 'Porky', type: 'Pig', breed: 'Large White', age: 1, weight: 120, health: 'Sick' },
    { id: 4, name: 'Clucky', type: 'Chicken', breed: 'Rhode Island Red', age: 1, weight: 2.5, health: 'Healthy' },
  ];
};

// Generate Zambian livestock health data
const generateZambianHealthData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    date: day,
    temperature: parseFloat((38.5 + (Math.random() - 0.5) * 2).toFixed(1)), // Temperature in °C
    activity: Math.floor(Math.random() * 40 + 60) // Activity level 60-100%
  }));
};

const LivestockMonitor = () => {
  const [livestockData, setLivestockData] = useState([]);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    // Generate Zambian demo data
    setLivestockData(generateZambianLivestock());
    setHealthData(generateZambianHealthData());
  }, []);

  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Livestock Health Overview
          </Typography>
          <Box sx={{ width: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[35, 42]} />
                <YAxis yAxisId="right" orientation="right" domain={[50, 100]} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                    return [`${value}%`, 'Activity Level'];
                  }}
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#8884d8" 
                  name="Temperature" 
                  strokeWidth={2}
                  dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4, fill: 'white' }} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#82ca9d" 
                  name="Activity Level" 
                  strokeWidth={2}
                  dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4, fill: 'white' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Livestock Details
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Breed</TableCell>
                <TableCell>Age (Years)</TableCell>
                <TableCell>Weight (kg)</TableCell>
                <TableCell>Health Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {livestockData.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell>{animal.name}</TableCell>
                  <TableCell>{animal.type}</TableCell>
                  <TableCell>{animal.breed}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.weight}</TableCell>
                  <TableCell>
                    <span style={{ 
                      color: animal.health === 'Healthy' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {animal.health}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestockMonitor;