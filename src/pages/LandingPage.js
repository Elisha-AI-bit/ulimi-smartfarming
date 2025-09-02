import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  AppBar, 
  Toolbar 
} from '@mui/material';
import { Agriculture as AgricultureIcon, 
         Insights as InsightsIcon, 
         Store as StoreIcon, 
         Security as SecurityIcon } from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AgricultureIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      title: 'Smart Farming',
      description: 'AI-powered recommendations for crop management, irrigation, and fertilization.'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      title: 'Real-time Monitoring',
      description: 'Monitor soil moisture, temperature, and humidity with our IoT sensors.'
    },
    {
      icon: <StoreIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      title: 'Marketplace',
      description: 'Buy and sell agricultural products directly with other farmers and buyers.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your data and transactions.'
    }
  ];

  return (
    <div>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AgricultureIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              Ulimi Smart Farming
            </Typography>
          </Box>
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/register')}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.8)'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', 
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#2e7d32' }}>
                Smart Farming Solutions
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 4, color: '#388e3c' }}>
                Empowering farmers with AI-driven insights and real-time monitoring
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    borderColor: '#2e7d32',
                    color: '#2e7d32',
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.04)'
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  width: 300, 
                  height: 300, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <AgricultureIcon sx={{ fontSize: 150, color: '#2e7d32' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f7f9' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6, color: '#2e7d32', fontWeight: 500 }}>
            Why Choose Ulimi?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8, backgroundColor: '#2e7d32' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 500 }}>
            Ready to Transform Your Farming?
          </Typography>
          <Typography variant="h6" sx={{ color: '#c8e6c9', mb: 4 }}>
            Join thousands of farmers already using Ulimi to increase productivity and profits
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ 
              backgroundColor: 'white',
              color: '#2e7d32',
              py: 1.5,
              px: 4,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: '#1b5e20', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AgricultureIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Ulimi Smart Farming</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#c8e6c9' }}>
                Empowering farmers with cutting-edge technology for better yields and sustainable farming practices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Quick Links</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ justifyContent: 'flex-start', color: '#c8e6c9' }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/register')}
                  sx={{ justifyContent: 'flex-start', color: '#c8e6c9' }}
                >
                  Register
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Contact Us</Typography>
              <Typography variant="body2" sx={{ color: '#c8e6c9', mb: 1 }}>
                Email: info@ulimi.com
              </Typography>
              <Typography variant="body2" sx={{ color: '#c8e6c9' }}>
                Phone: +1 (555) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, textAlign: 'center', pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="body2" sx={{ color: '#c8e6c9' }}>
              © {new Date().getFullYear()} Ulimi Smart Farming System. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;