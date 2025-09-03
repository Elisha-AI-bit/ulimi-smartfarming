import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

// This component is now deprecated and replaced by the Marketplace page
// Keeping it for backward compatibility but it's essentially empty
const Marketplace = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1">
        Marketplace has been moved to a dedicated page. Please navigate to the Marketplace page.
      </Typography>
    </Box>
  );
};

export default Marketplace;