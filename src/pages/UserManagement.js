import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  TextField,
  Grid
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Farmer', email: 'john@example.com', role: 'farmer', status: 'active' },
  { id: 2, name: 'Jane Buyer', email: 'jane@example.com', role: 'buyer', status: 'active' },
  { id: 3, name: 'Bob Vendor', email: 'bob@example.com', role: 'vendor', status: 'active' },
  { id: 4, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
];

const UserManagement = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          User Management
        </Typography>
        
        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                Manage Users
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search users..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button 
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Add New User
                </Button>
              </Grid>
            </Grid>
            
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role} 
                        size="small" 
                        sx={{ 
                          backgroundColor: user.role === 'admin' ? '#ff980020' : 
                                          user.role === 'farmer' ? '#4caf5020' : 
                                          user.role === 'buyer' ? '#2196f320' : '#9c27b020',
                          color: user.role === 'admin' ? '#ff9800' : 
                                 user.role === 'farmer' ? '#4caf50' : 
                                 user.role === 'buyer' ? '#2196f3' : '#9c27b0'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#4caf5020', 
                          color: '#4caf50'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small" sx={{ mr: 1 }}>Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default UserManagement;