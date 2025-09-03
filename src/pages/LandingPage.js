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
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Agriculture as AgricultureIcon, 
         Insights as InsightsIcon, 
         Store as StoreIcon, 
         Security as SecurityIcon,
         ArrowForward as ArrowForwardIcon,
         Check as CheckIcon } from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const benefits = [
    "Increase crop yields by up to 40%",
    "Reduce water usage by 30%",
    "Access real-time market prices",
    "Connect with agricultural experts",
    "Automate farm management tasks"
  ];

  return (
    <div>
      {/* Header */}
      <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AgricultureIcon sx={{ mr: 1, color: '#2e7d32' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#2e7d32' }}>
              Ulimi
            </Typography>
          </Box>
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ mr: 2, fontWeight: 600, color: '#2e7d32' }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/register')}
              sx={{ 
                backgroundColor: '#2e7d32',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', 
          py: { xs: 6, md: 10 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, pr: { md: 4 } }}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 800, 
                    color: 'text.primary',
                    fontSize: { xs: '2.25rem', md: '3rem' },
                    lineHeight: 1.2
                  }}
                >
                  Modern Agriculture, <Box component="span" sx={{ color: '#2e7d32' }}>Smart Solutions</Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    mb: 4, 
                    color: 'text.secondary',
                    fontWeight: 400
                  }}
                >
                  Empowering farmers with AI-driven insights and real-time monitoring for better yields and sustainable farming practices.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: 1.5,
                      px: 4,
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
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderColor: '#2e7d32',
                      color: '#2e7d32',
                      '&:hover': {
                        borderColor: '#1b5e20',
                        backgroundColor: 'rgba(46, 125, 50, 0.04)'
                      }
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box 
                sx={{ 
                  backgroundColor: 'white', 
                  borderRadius: '24px', 
                  width: { xs: 250, sm: 350, md: 400 }, 
                  height: { xs: 250, sm: 350, md: 400 }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
                  border: '8px solid white'
                }}
              >
                <AgricultureIcon sx={{ fontSize: { xs: 120, sm: 180, md: 200 }, color: '#2e7d32' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                Transform Your Farming Operations
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
                Our platform helps farmers increase productivity, reduce costs, and make data-driven decisions for better outcomes.
              </Typography>
              <Grid container spacing={2}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckIcon sx={{ color: '#4caf50', mr: 1 }} />
                      <Typography variant="body1">{benefit}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  backgroundColor: 'grey.100', 
                  borderRadius: 4, 
                  height: 400, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Dashboard Preview
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
              Powerful Features
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Everything you need to optimize your farming operations and maximize your yields
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    textAlign: 'left',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                      borderColor: '#2e7d32'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, flex: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
      <Box sx={{ py: 10, backgroundColor: '#2e7d32' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
            Ready to Transform Your Farming?
          </Typography>
          <Typography variant="h6" sx={{ color: '#c8e6c9', mb: 5, maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Join thousands of farmers already using Ulimi to increase productivity and profits
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ 
              backgroundColor: 'white',
              color: '#2e7d32',
              py: 2,
              px: 6,
              fontWeight: 700,
              fontSize: '1.125rem',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, backgroundColor: 'text.primary', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AgricultureIcon sx={{ mr: 1, color: '#2e7d32' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Ulimi</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
                Empowering farmers with cutting-edge technology for better yields and sustainable farming practices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Quick Links</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ justifyContent: 'flex-start', color: 'grey.400', px: 0, py: 0.5 }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/register')}
                  sx={{ justifyContent: 'flex-start', color: 'grey.400', px: 0, py: 0.5 }}
                >
                  Register
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Contact Us</Typography>
              <Typography variant="body2" sx={{ color: 'grey.400', mb: 1 }}>
                Email: info@ulimi.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Phone: +1 (555) 123-4567
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6, textAlign: 'center', pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              © {new Date().getFullYear()} Ulimi Smart Farming System. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;