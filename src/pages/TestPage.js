import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import TestChart from '../components/TestChart';

const TestPage = () => {
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Test Page
        </Typography>
        <TestChart />
      </Box>
    </DashboardLayout>
  );
};

export default TestPage;