import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock livestock data
const mockLivestock = [
  { id: 1, name: 'Bessie', type: 'Cattle', breed: 'Holstein', age: 3, weight: 650, health: 'Healthy' },
  { id: 2, name: 'Dolly', type: 'Sheep', breed: 'Suffolk', age: 2, weight: 75, health: 'Healthy' },
  { id: 3, name: 'Porky', type: 'Pig', breed: 'Yorkshire', age: 1, weight: 120, health: 'Sick' },
  { id: 4, name: 'Clucky', type: 'Chicken', breed: 'Rhode Island', age: 1, weight: 2.5, health: 'Healthy' },
];

// Mock health data for chart
const mockHealthData = [
  { date: 'Mon', temperature: 38.5, activity: 85 },
  { date: 'Tue', temperature: 38.2, activity: 90 },
  { date: 'Wed', temperature: 39.1, activity: 70 },
  { date: 'Thu', temperature: 38.8, activity: 75 },
  { date: 'Fri', temperature: 38.6, activity: 88 },
  { date: 'Sat', temperature: 38.4, activity: 92 },
  { date: 'Sun', temperature: 38.3, activity: 87 },
];

const LivestockMonitor = () => {
  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Livestock Health Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
              <Line yAxisId="right" type="monotone" dataKey="activity" stroke="#82ca9d" name="Activity Level" />
            </LineChart>
          </ResponsiveContainer>
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
                <TableCell>Age</TableCell>
                <TableCell>Weight (kg)</TableCell>
                <TableCell>Health Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockLivestock.map((animal) => (
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