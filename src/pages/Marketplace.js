import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  CardMedia,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  IconButton,
  Pagination
} from '@mui/material';
import { 
  Store as StoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState([1, 3]); // Mock favorites
  const [page, setPage] = useState(1);

  // Mock product data
  const products = [
    { 
      id: 1, 
      name: 'Organic Maize', 
      vendor: 'Green Farms Co.', 
      price: 'K0.45/kg', 
      rating: 4.5, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Grains',
      inStock: true,
      discount: null
    },
    { 
      id: 2, 
      name: 'Fresh Tomatoes', 
      vendor: 'Farm Fresh Ltd.', 
      price: 'K0.95/kg', 
      rating: 4.2, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
      inStock: true,
      discount: '10% off'
    },
    { 
      id: 3, 
      name: 'Organic Beans', 
      vendor: 'Healthy Harvest', 
      price: 'K0.65/kg', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Legumes',
      inStock: false,
      discount: null
    },
    { 
      id: 4, 
      name: 'Fresh Carrots', 
      vendor: 'Root Vegetables Inc.', 
      price: 'K0.75/kg', 
      rating: 4.0, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Vegetables',
      inStock: true,
      discount: null
    },
    { 
      id: 5, 
      name: 'Premium Rice', 
      vendor: 'Golden Grain', 
      price: 'K1.20/kg', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Grains',
      inStock: true,
      discount: '15% off'
    },
    { 
      id: 6, 
      name: 'Organic Fertilizer', 
      vendor: 'EcoGrow Supplies', 
      price: 'k2.50/kg', 
      rating: 4.3, 
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      category: 'Supplies',
      inStock: true,
      discount: null
    },
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProducts = products.filter(product => 
    (category === 'all' || product.category.toLowerCase() === category) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return parseFloat(a.price.replace('K', '')) - parseFloat(b.price.replace('K', ''));
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            Marketplace
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
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
          {/* Filters */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        <MenuItem value="grains">Grains</MenuItem>
                        <MenuItem value="vegetables">Vegetables</MenuItem>
                        <MenuItem value="legumes">Legumes</MenuItem>
                        <MenuItem value="supplies">Agricultural Supplies</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
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
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Button 
                      variant="outlined" 
                      startIcon={<LocalOfferIcon />}
                      fullWidth
                      sx={{ borderColor: '#2E7D32', color: '#2E7D32' }}
                    >
                      View Special Offers
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Products */}
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {product.discount && (
                  <Chip 
                    label={product.discount} 
                    size="small" 
                    sx={{ 
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: '#E53935',
                      color: '#FFFFFF'
                    }} 
                  />
                )}
                
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleFavorite(product.id)}
                      sx={{ color: favorites.includes(product.id) ? '#E53935' : '#9E9E9E' }}
                    >
                      {favorites.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#616161', mb: 1 }}>
                    by {product.vendor}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.rating}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ 
                      alignSelf: 'flex-start',
                      mb: 1,
                      backgroundColor: product.category === 'Grains' ? '#FFD54F' : 
                                     product.category === 'Vegetables' ? '#81C784' : 
                                     product.category === 'Legumes' ? '#4FC3F7' : '#BA68C8',
                      color: '#000000'
                    }} 
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                      {product.price}
                    </Typography>
                    <Chip 
                      label={product.inStock ? 'In Stock' : 'Out of Stock'} 
                      size="small" 
                      sx={{ 
                        backgroundColor: product.inStock ? '#4CAF50' : '#E53935',
                        color: '#FFFFFF'
                      }} 
                    />
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    disabled={!product.inStock}
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
          
          {paginatedProducts.length === 0 && (
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#F5F5F5',
                textAlign: 'center',
                py: 5
              }}>
                <StoreIcon sx={{ fontSize: 60, color: '#9E9E9E', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#616161', mb: 1 }}>
                  No products found
                </Typography>
                <Typography variant="body1" sx={{ color: '#9E9E9E' }}>
                  Try adjusting your search or filter criteria
                </Typography>
              </Card>
            </Grid>
          )}
          
          {/* Pagination */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(e, value) => setPage(value)}
              color="primary"
              sx={{ 
                '& .MuiPaginationItem-root': {
                  color: '#FFFFFF'
                },
                '& .Mui-selected': {
                  backgroundColor: '#2E7D32',
                  color: '#FFFFFF'
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Marketplace;