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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Restaurant as RestaurantIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  LocalDining as LocalDiningIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const BuyerNutrition = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock nutrition data
  const nutritionData = [
    { 
      id: 1, 
      name: 'Maize', 
      category: 'Grains', 
      nutrients: ['Carbohydrates', 'Fiber', 'Vitamin B6', 'Magnesium'], 
      benefits: 'Provides energy, supports digestion, and helps maintain healthy blood sugar levels.',
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 2, 
      name: 'Beans', 
      category: 'Legumes', 
      nutrients: ['Protein', 'Fiber', 'Iron', 'Folate'], 
      benefits: 'Excellent source of plant-based protein, supports heart health, and aids in weight management.',
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 3, 
      name: 'Tomatoes', 
      category: 'Vegetables', 
      nutrients: ['Vitamin C', 'Vitamin K', 'Folate', 'Potassium'], 
      benefits: 'Rich in antioxidants, supports immune system, and promotes healthy skin.',
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 4, 
      name: 'Carrots', 
      category: 'Vegetables', 
      nutrients: ['Vitamin A', 'Vitamin K', 'Potassium', 'Fiber'], 
      benefits: 'Supports eye health, boosts immune system, and promotes healthy skin.',
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 5, 
      name: 'Spinach', 
      category: 'Vegetables', 
      nutrients: ['Vitamin K', 'Iron', 'Folate', 'Vitamin A'], 
      benefits: 'Supports bone health, aids in blood clotting, and promotes healthy vision.',
      image: 'https://images.unsplash.com/photo-1585011205130-30a064e4e4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
  ];

  const filteredData = nutritionData.filter(item => 
    (filter === 'all' || item.category.toLowerCase() === filter) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userRole="buyer" userName="Buyer">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2E7D32', fontWeight: 500 }}>
            Nutritional Advice
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filter}
                label="Category"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="grains">Grains</MenuItem>
                <MenuItem value="legumes">Legumes</MenuItem>
                <MenuItem value="vegetables">Vegetables</MenuItem>
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
          {/* Nutrition Overview */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <RestaurantIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Nutrition Overview
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Understanding the nutritional value of the crops you purchase helps you make informed decisions about your diet and health. Here you can find detailed information about the nutritional content and health benefits of various agricultural products.
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Why Nutritional Information Matters:</strong>
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUpIcon sx={{ color: '#2E7D32' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Health Benefits" 
                          secondary="Make informed choices for better health outcomes" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocalDiningIcon sx={{ color: '#2E7D32' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Dietary Planning" 
                          secondary="Plan meals based on nutritional needs" 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <InfoIcon sx={{ color: '#2E7D32' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Quality Assurance" 
                          secondary="Understand what you're consuming" 
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#E8F5E9'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2E7D32' }}>
                          Recommended Daily Intake
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Grains:</strong> 6-8 servings per day
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Vegetables:</strong> 2.5-3 cups per day
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Legumes:</strong> 1-2 cups per day
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Fruits:</strong> 2-2.5 cups per day
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                          Note: These are general recommendations. Individual needs may vary based on age, gender, and activity level.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Crop Nutrition Details */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, color: '#2E7D32', fontWeight: 500 }}>
              Crop Nutrition Details
            </Typography>
          </Grid>
          
          {filteredData.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: 60, height: 60, borderRadius: '50%', marginRight: 16 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>
                        {item.name}
                      </Typography>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ 
                          backgroundColor: item.category === 'Grains' ? '#FFD54F' : 
                                         item.category === 'Legumes' ? '#81C784' : '#4FC3F7',
                          color: '#000000'
                        }} 
                      />
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                        Key Nutrients
                      </Typography>
                      <List>
                        {item.nutrients.map((nutrient, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <InfoIcon sx={{ fontSize: 16, color: '#2E7D32' }} />
                            </ListItemIcon>
                            <ListItemText primary={nutrient} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                        Health Benefits
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#616161' }}>
                        {item.benefits}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          {filteredData.length === 0 && (
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                py: 5
              }}>
                <RestaurantIcon sx={{ fontSize: 60, color: '#9E9E9E', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#616161', mb: 1 }}>
                  No nutrition data found
                </Typography>
                <Typography variant="body1" sx={{ color: '#9E9E9E' }}>
                  Try adjusting your search or filter criteria
                </Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default BuyerNutrition;