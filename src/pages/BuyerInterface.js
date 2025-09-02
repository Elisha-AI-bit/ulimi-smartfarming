import React, { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent } from '@mui/material';
import { Store as StoreIcon, Search as SearchIcon } from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import Marketplace from '../components/Marketplace';

const BuyerInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout userRole="buyer" userName="Buyer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Marketplace
        </Typography>
        
        <Card sx={{ 
          mb: 3, 
          borderRadius: 3, 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
        
        <Marketplace />
      </Box>
    </DashboardLayout>
  );
};

export default BuyerInterface;