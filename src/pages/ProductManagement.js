import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Inventory as InventoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const ProductManagement = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  
  // Mock product data
  const [products] = useState([
    { id: 1, name: 'Organic Tomatoes', description: 'Fresh organic tomatoes', price: 3.99, quantity: 50, category: 'vegetables' },
    { id: 2, name: 'Free Range Eggs', description: 'Farm fresh eggs', price: 5.99, quantity: 30, category: 'dairy' },
    { id: 3, name: 'Honey', description: 'Pure organic honey', price: 8.99, quantity: 20, category: 'other' },
    { id: 4, name: 'Fresh Carrots', description: 'Crunchy fresh carrots', price: 2.49, quantity: 100, category: 'vegetables' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would submit this to Supabase
    console.log('Product listing:', { productName, description, price, quantity, category });
    
    // Reset form
    setProductName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
  };

  return (
    <DashboardLayout userRole="vendor" userName="Vendor">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Product Management
        </Typography>
        
        <Grid container spacing={3}>
          {/* Add Product Form */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InventoryIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Add New Product
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        variant="outlined"
                        margin="normal"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Quantity"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          value={category}
                          label="Category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <MenuItem value="vegetables">Vegetables</MenuItem>
                          <MenuItem value="fruits">Fruits</MenuItem>
                          <MenuItem value="dairy">Dairy</MenuItem>
                          <MenuItem value="meat">Meat</MenuItem>
                          <MenuItem value="grains">Grains</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ 
                          backgroundColor: '#2e7d32',
                          '&:hover': {
                            backgroundColor: '#1b5e20'
                          }
                        }}
                      >
                        Add Product
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Product List */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InventoryIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Product Inventory
                  </Typography>
                </Box>
                
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Typography variant="subtitle2">{product.name}</Typography>
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <Chip 
                            label={product.quantity} 
                            size="small" 
                            color={product.quantity > 20 ? 'success' : 'warning'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={product.category} 
                            size="small" 
                            sx={{ 
                              backgroundColor: '#2e7d3220', 
                              color: '#2e7d32'
                            }} 
                          />
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<EditIcon />} sx={{ mr: 1 }}>
                            Edit
                          </Button>
                          <Button size="small" startIcon={<DeleteIcon />} color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ProductManagement;