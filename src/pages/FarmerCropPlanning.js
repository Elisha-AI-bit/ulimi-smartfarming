import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider
} from '@mui/material';
import { 
  Agriculture as AgricultureIcon,
  Add as AddIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const FarmerCropPlanning = () => {
  const [cropName, setCropName] = useState('');
  const [soilType, setSoilType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [expectedYield, setExpectedYield] = useState('');
  const [irrigationNeeds, setIrrigationNeeds] = useState(50);
  const [fertilizerNeeds, setFertilizerNeeds] = useState(50);
  const [pestControl, setPestControl] = useState(false);

  const handleIrrigationChange = (event, newValue) => {
    setIrrigationNeeds(newValue);
  };

  const handleFertilizerChange = (event, newValue) => {
    setFertilizerNeeds(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the crop plan
    alert('Crop plan saved successfully!');
    // Reset form
    setCropName('');
    setSoilType('');
    setPlantingDate('');
    setExpectedYield('');
    setIrrigationNeeds(50);
    setFertilizerNeeds(50);
    setPestControl(false);
  };

  // Mock crop data
  const cropPlans = [
    { id: 1, name: 'Maize', plantingDate: '2023-05-15', expectedYield: '5 tons', status: 'Growing' },
    { id: 2, name: 'Beans', plantingDate: '2023-04-20', expectedYield: '2 tons', status: 'Harvesting Soon' },
    { id: 3, name: 'Tomatoes', plantingDate: '2023-06-01', expectedYield: '3 tons', status: 'Planted' },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          Crop Planning
        </Typography>
        
        <Grid container spacing={3}>
          {/* Add New Crop Plan */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AgricultureIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Add New Crop Plan
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Crop Name"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Soil Type</InputLabel>
                        <Select
                          value={soilType}
                          label="Soil Type"
                          onChange={(e) => setSoilType(e.target.value)}
                        >
                          <MenuItem value="clay">Clay</MenuItem>
                          <MenuItem value="sandy">Sandy</MenuItem>
                          <MenuItem value="loamy">Loamy</MenuItem>
                          <MenuItem value="silty">Silty</MenuItem>
                          <MenuItem value="peaty">Peaty</MenuItem>
                          <MenuItem value="chalky">Chalky</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Planting Date"
                        type="date"
                        value={plantingDate}
                        onChange={(e) => setPlantingDate(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Expected Yield (tons)"
                        type="number"
                        value={expectedYield}
                        onChange={(e) => setExpectedYield(e.target.value)}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Irrigation Needs: {irrigationNeeds}%
                      </Typography>
                      <Slider
                        value={irrigationNeeds}
                        onChange={handleIrrigationChange}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Fertilizer Needs: {fertilizerNeeds}%
                      </Typography>
                      <Slider
                        value={fertilizerNeeds}
                        onChange={handleFertilizerChange}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pestControl}
                            onChange={(e) => setPestControl(e.target.checked)}
                          />
                        }
                        label="Include Pest Control Plan"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        type="submit"
                        variant="contained" 
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF', py: 1.5 }}
                      >
                        Add Crop Plan
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Existing Crop Plans */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AgricultureIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Existing Crop Plans
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {cropPlans.map((crop) => (
                    <Grid item xs={12} key={crop.id}>
                      <Card sx={{ 
                        borderRadius: 2, 
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                        borderLeft: `4px solid ${crop.status.includes('Harvesting') ? '#4CAF50' : '#2196F3'}`
                      }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {crop.name}
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                <strong>Planting Date:</strong> {crop.plantingDate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                <strong>Expected Yield:</strong> {crop.expectedYield}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" sx={{ color: '#616161' }}>
                                <strong>Status:</strong> 
                                <span style={{ 
                                  color: crop.status.includes('Harvesting') ? '#4CAF50' : '#2196F3',
                                  fontWeight: 'bold'
                                }}>
                                  {' '}{crop.status}
                                </span>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button size="small" sx={{ color: '#2E7D32' }}>
                              View Details
                            </Button>
                            <Button size="small" sx={{ color: '#2E7D32' }}>
                              Edit
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* AI Recommendations */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AgricultureIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    AI Recommendations
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #FF9800'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#FF9800' }}>
                          Optimal Planting Time
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          Based on current weather patterns and soil conditions, the optimal time to plant tomatoes is in the next 3 days.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #4CAF50'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#4CAF50' }}>
                          Fertilizer Recommendation
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          Your soil analysis suggests using nitrogen-rich fertilizer for your maize crop to maximize yield.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #2196F3'
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#2196F3' }}>
                          Irrigation Schedule
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#616161' }}>
                          With current weather conditions, irrigate your bean crop every 3 days for optimal growth.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default FarmerCropPlanning;