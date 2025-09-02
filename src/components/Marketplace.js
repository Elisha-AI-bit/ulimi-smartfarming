import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, TextField, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Store as StoreIcon } from '@mui/icons-material';

// Mock product data
const mockProducts = [
  { id: 1, name: 'Organic Tomatoes', description: 'Fresh organic tomatoes from local farm', price: 3.99, quantity: 50, category: 'Vegetables' },
  { id: 2, name: 'Free Range Eggs', description: 'Farm fresh free range eggs', price: 5.99, quantity: 30, category: 'Dairy' },
  { id: 3, name: 'Honey', description: 'Pure organic honey from local bees', price: 8.99, quantity: 20, category: 'Other' },
  { id: 4, name: 'Fresh Carrots', description: 'Crunchy fresh carrots', price: 2.49, quantity: 100, category: 'Vegetables' },
];

const Marketplace = () => {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StoreIcon sx={{ mr: 1, color: '#2e7d32' }} />
        <Typography variant="h6" className="section-title">
          Marketplace
        </Typography>
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} key={product.id}>
            <Card className="card-container">
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  In stock: {product.quantity}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => addToCart(product)}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {cart.length > 0 && (
        <Card sx={{ position: 'fixed', bottom: 20, right: 20, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)' }}>
          <CardContent>
            <Typography variant="h6">
              <ShoppingCartIcon /> Cart ({cart.length})
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              sx={{ 
                mt: 1,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              View Cart
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Marketplace;