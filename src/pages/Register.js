import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material';
import { Agriculture as AgricultureIcon } from '@mui/icons-material';
import supabase from '../services/supabase';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('Registration successful:', data);
      
      // In a real app, we would also store the additional user information in our database
      console.log('Additional user info:', { name, phone, address, role });
      
      // Redirect to login after registration
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ 
          minWidth: 350,
          borderRadius: 3,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <AgricultureIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
            </Box>
            <Typography component="h1" variant="h5" align="center" className="page-title" sx={{ mb: 3 }}>
              Register for Ulimi
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="farmer">Farmer</MenuItem>
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="vendor">Vendor</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="action-button"
                sx={{ 
                  mt: 2, 
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#2e7d32',
                  '&:hover': {
                    backgroundColor: '#1b5e20'
                  }
                }}
              >
                Register
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ 
                  py: 1.5,
                  borderColor: '#2e7d32',
                  color: '#2e7d32',
                  '&:hover': {
                    borderColor: '#1b5e20',
                    backgroundColor: 'rgba(46, 125, 50, 0.04)'
                  }
                }}
              >
                Back to Home
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;