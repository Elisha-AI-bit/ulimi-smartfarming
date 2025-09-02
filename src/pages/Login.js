import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Link } from '@mui/material';
import { Agriculture as AgricultureIcon } from '@mui/icons-material';
import supabase from '../services/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('Login successful:', data);
      
      // Automatically redirect to farmer dashboard
      // In a real app, we would determine the user's role from the database
      navigate('/farmer');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
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
              Ulimi Smart Farming System
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
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
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link href="#" variant="body2" onClick={() => navigate('/')} sx={{ color: '#2e7d32' }}>
                  Back to Home
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;