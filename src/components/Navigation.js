import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Agriculture as AgricultureIcon } from '@mui/icons-material';

const Navigation = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, we would log out of Supabase here
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#2e7d32',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AgricultureIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ulimi Smart Farming
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;