import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Agriculture as AgricultureIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const FarmManagement = () => {
  const [farms, setFarms] = useState([
    { 
      id: 1, 
      name: 'Green Valley Farm', 
      location: 'Northern Region, Plot 12', 
      size: 50, 
      crops: ['Tomatoes', 'Carrots'], 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Sunset Orchard', 
      location: 'Eastern Region, Plot 7', 
      size: 30, 
      crops: ['Apples', 'Pears'], 
      status: 'Active' 
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [farmForm, setFarmForm] = useState({
    name: '',
    location: '',
    size: '',
    crops: ''
  });

  const handleOpenDialog = (farm = null) => {
    if (farm) {
      setEditingFarm(farm);
      setFarmForm({
        name: farm.name,
        location: farm.location,
        size: farm.size,
        crops: farm.crops.join(', ')
      });
    } else {
      setEditingFarm(null);
      setFarmForm({
        name: '',
        location: '',
        size: '',
        crops: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFarm(null);
  };

  const handleFormChange = (field, value) => {
    setFarmForm({ ...farmForm, [field]: value });
  };

  const handleSubmit = () => {
    if (editingFarm) {
      // Update existing farm
      setFarms(farms.map(farm => 
        farm.id === editingFarm.id 
          ? { 
              ...farm, 
              name: farmForm.name,
              location: farmForm.location,
              size: parseFloat(farmForm.size) || 0,
              crops: farmForm.crops.split(',').map(crop => crop.trim()).filter(crop => crop)
            } 
          : farm
      ));
    } else {
      // Add new farm
      const newFarm = {
        id: farms.length + 1,
        name: farmForm.name,
        location: farmForm.location,
        size: parseFloat(farmForm.size) || 0,
        crops: farmForm.crops.split(',').map(crop => crop.trim()).filter(crop => crop),
        status: 'Active'
      };
      setFarms([...farms, newFarm]);
    }
    
    handleCloseDialog();
  };

  const handleDeleteFarm = (id) => {
    setFarms(farms.filter(farm => farm.id !== id));
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Farm Management
        </Typography>
        
        {/* Add Farm Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ 
            mb: 3,
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20'
            }
          }}
        >
          Add New Farm
        </Button>
        
        {/* Farms Grid */}
        <Grid container spacing={2}>
          {farms.map((farm) => (
            <Grid item xs={12} sm={6} md={4} key={farm.id}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AgricultureIcon sx={{ mr: 1, color: '#2e7d32' }} />
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {farm.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {farm.location}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleOpenDialog(farm)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteFarm(farm.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Size:</strong> {farm.size} acres
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Status:</strong> {farm.status}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Crops:</strong> {farm.crops.join(', ')}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{ 
                      mt: 'auto',
                      borderColor: '#2e7d32',
                      color: '#2e7d32',
                      '&:hover': {
                        borderColor: '#1b5e20',
                        backgroundColor: 'rgba(46, 125, 50, 0.04)'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Add/Edit Farm Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingFarm ? 'Edit Farm' : 'Add New Farm'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Farm Name"
                variant="outlined"
                fullWidth
                value={farmForm.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
              />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={farmForm.location}
                onChange={(e) => handleFormChange('location', e.target.value)}
              />
              <TextField
                label="Size (acres)"
                variant="outlined"
                fullWidth
                type="number"
                value={farmForm.size}
                onChange={(e) => handleFormChange('size', e.target.value)}
              />
              <TextField
                label="Crops (comma separated)"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={farmForm.crops}
                onChange={(e) => handleFormChange('crops', e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{ 
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              {editingFarm ? 'Update' : 'Add'} Farm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default FarmManagement;