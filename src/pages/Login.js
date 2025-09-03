import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Link, 
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Agriculture as AgricultureIcon } from '@mui/icons-material';
import supabase from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { roles } from '../context/RBACContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
      
      console.log('Login successful:', data);
      
      // For mock implementation, determine role based on email
      // In a real implementation, this would come from the database
      let userRole = roles.FARMER; // default role
      
      if (email.includes('admin')) {
        userRole = roles.ADMIN;
      } else if (email.includes('buyer')) {
        userRole = roles.BUYER;
      } else if (email.includes('vendor')) {
        userRole = roles.VENDOR;
      }
      
      console.log('User role determined as:', userRole);
      
      // Set user data in AuthContext
      login({
        id: data.user.id,
        email: data.user.email,
        role: userRole
      });
      
      console.log('User data set in AuthContext');
      
      // Redirect based on user role
      switch (userRole) {
        case roles.ADMIN:
          console.log('Redirecting to /admin');
          navigate('/admin');
          break;
        case roles.FARMER:
          console.log('Redirecting to /farmer');
          navigate('/farmer');
          break;
        case roles.BUYER:
          console.log('Redirecting to /buyer');
          navigate('/buyer');
          break;
        case roles.VENDOR:
          console.log('Redirecting to /vendor');
          navigate('/vendor');
          break;
        default:
          console.log('Unknown role, redirecting to /');
          navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Login failed: ' + error.message);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
      p: 2
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card sx={{ 
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            overflow: 'visible'
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, pb: { xs: 3, sm: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ 
                  backgroundColor: '#2e7d32', 
                  borderRadius: '50%', 
                  width: 72, 
                  height: 72, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.25)'
                }}>
                  <AgricultureIcon sx={{ fontSize: 36, color: 'white' }} />
                </Box>
              </Box>
              <Typography 
                component="h1" 
                variant="h4" 
                align="center" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  mb: 4, 
                  color: 'text.secondary'
                }}
              >
                Sign in to your Ulimi account
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
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
                  size="large"
                  sx={{ 
                    mt: 2, 
                    mb: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    backgroundColor: '#2e7d32',
                    boxShadow: '0 4px 12px rgba(46, 125, 50, 0.25)',
                    '&:hover': {
                      backgroundColor: '#1b5e20',
                      boxShadow: '0 6px 16px rgba(46, 125, 50, 0.35)'
                    }
                  }}
                >
                  Sign In
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link 
                    component={RouterLink} 
                    to="/register" 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      color: '#2e7d32',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link 
                    component={RouterLink} 
                    to="/" 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    ← Back to Home
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;