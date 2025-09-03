import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Star as StarIcon,
  Delete as DeleteIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const BuyerWishlist = () => {
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    { 
      id: 1, 
      name: 'Organic Maize', 
      vendor: 'Green Farms Co.', 
      price: 'K0.45/kg', 
      rating: 4.5, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Grains',
      inStock: true
    },
    { 
      id: 2, 
      name: 'Fresh Tomatoes', 
      vendor: 'Farm Fresh Ltd.', 
      price: 'K0.95/kg', 
      rating: 4.2, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
      inStock: true
    },
    { 
      id: 3, 
      name: 'Organic Beans', 
      vendor: 'Healthy Harvest', 
      price: 'K0.65/kg', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Legumes',
      inStock: false
    },
    { 
      id: 4, 
      name: 'Fresh Carrots', 
      vendor: 'Root Vegetables Inc.', 
      price: 'K0.75/kg', 
      rating: 4.0, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
      inStock: true
    },
    { 
      id: 5, 
      name: 'Premium Rice', 
      vendor: 'Golden Grain', 
      price: 'K1.20/kg', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Grains',
      inStock: true
    },
  ]);

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return parseFloat(a.price.replace('K', '')) - parseFloat(b.price.replace('K', ''));
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <DashboardLayout userRole="buyer" userName="Buyer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 500 }}>
            My Wishlist
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search wishlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              startIcon={<FilterIcon />}
              sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          {sortedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ color: '#E53935' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#616161', mb: 1 }}>
                    by {item.vendor}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={item.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {item.rating}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={item.category} 
                    size="small" 
                    sx={{ 
                      alignSelf: 'flex-start',
                      mb: 1,
                      backgroundColor: item.category === 'Grains' ? '#FFD54F' : 
                                     item.category === 'Vegetables' ? '#81C784' : '#4FC3F7',
                      color: '#000000'
                    }} 
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                      {item.price}
                    </Typography>
                    <Chip 
                      label={item.inStock ? 'In Stock' : 'Out of Stock'} 
                      size="small" 
                      sx={{ 
                        backgroundColor: item.inStock ? '#4CAF50' : '#E53935',
                        color: '#FFFFFF'
                      }} 
                    />
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    startIcon={<AddShoppingCartIcon />}
                    fullWidth
                    disabled={!item.inStock}
                    sx={{ 
                      mt: 2, 
                      backgroundColor: '#2E7D32', 
                      color: '#FFFFFF',
                      '&:disabled': {
                        backgroundColor: '#9E9E9E'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          {sortedItems.length === 0 && (
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                py: 5
              }}>
                <StarIcon sx={{ fontSize: 60, color: '#9E9E9E', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#616161', mb: 1 }}>
                  Your wishlist is empty
                </Typography>
                <Typography variant="body1" sx={{ color: '#9E9E9E', mb: 2 }}>
                  Start adding products to your wishlist to save them for later
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                >
                  Browse Products
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default BuyerWishlist;