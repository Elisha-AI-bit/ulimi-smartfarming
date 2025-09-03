import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Store as StoreIcon } from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';
import Marketplace from './Marketplace';

const BuyerInterface = () => {
  return (
    <DashboardLayout userRole="buyer" userName="Buyer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Marketplace
        </Typography>
        
        <Marketplace />
      </Box>
    </DashboardLayout>
  );
};

export default BuyerInterface;