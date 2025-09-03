import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Card, 
  CardContent,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Agriculture as AgricultureIcon } from '@mui/icons-material';
import supabase from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { roles } from '../context/RBACContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(roles.FARMER);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login } = useAuth();

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
      
      // Set user data in AuthContext
      login({
        id: data.user.id,
        email: data.user.email,
        role: role
      });
      
      // In a real app, we would also store the additional user information in our database
      console.log('Additional user info:', { name, phone, address, role });
      
      // Redirect based on user role
      switch (role) {
        case roles.FARMER:
          navigate('/farmer');
          break;
        case roles.BUYER:
          navigate('/buyer');
          break;
        case roles.VENDOR:
          navigate('/vendor');
          break;
        default:
          navigate('/farmer');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed: ' + error.message);
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
                Create Account
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  mb: 4, 
                  color: 'text.secondary'
                }}
              >
                Join Ulimi to transform your farming operations
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
                    <MenuItem value={roles.FARMER}>Farmer</MenuItem>
                    <MenuItem value={roles.BUYER}>Buyer</MenuItem>
                    <MenuItem value={roles.VENDOR}>Vendor</MenuItem>
                  </Select>
                </FormControl>
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
                  Create Account
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Link 
                    component={RouterLink} 
                    to="/login" 
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
                    Already have an account? Sign In
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

export default Register;