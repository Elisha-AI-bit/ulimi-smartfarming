import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Button,
  TextField,
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
  People as PeopleIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock user data
  const users = [
    { id: 1, name: 'John Farmer', email: 'john@farm.com', role: 'farmer', status: 'active' },
    { id: 2, name: 'Jane Buyer', email: 'jane@buyer.com', role: 'buyer', status: 'active' },
    { id: 3, name: 'Bob Vendor', email: 'bob@vendor.com', role: 'vendor', status: 'active' },
    { id: 4, name: 'Admin User', email: 'admin@ulimi.com', role: 'admin', status: 'active' },
    { id: 5, name: 'Alice Farmer', email: 'alice@farm.com', role: 'farmer', status: 'inactive' },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#f44336';
      case 'farmer': return '#4caf50';
      case 'buyer': return '#2196f3';
      case 'vendor': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#4caf50' : '#9e9e9e';
  };

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          User Management
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PeopleIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Manage Users
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: '#9E9E9E' }} />
                    }}
                    sx={{ width: '300px' }}
                  />
                  <Button 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: '#2E7D32',
                      '&:hover': { backgroundColor: '#1B5E20' }
                    }}
                  >
                    Add New User
                  </Button>
                </Box>
                
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#E8F5E9' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#000000' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" sx={{ color: '#000000' }}>
                            {user.name}
                          </TableCell>
                          <TableCell sx={{ color: '#000000' }}>{user.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role} 
                              size="small" 
                              sx={{ 
                                backgroundColor: getRoleColor(user.role),
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                              }} 
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.status} 
                              size="small" 
                              sx={{ 
                                backgroundColor: getStatusColor(user.status),
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                              }} 
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              startIcon={<EditIcon />} 
                              size="small" 
                              sx={{ color: '#2E7D32', mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button 
                              startIcon={<DeleteIcon />} 
                              size="small" 
                              sx={{ color: '#f44336' }}
                            >
                              Delete
                            </Button>
                          </TableCell>
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

export default AdminUserManagement;