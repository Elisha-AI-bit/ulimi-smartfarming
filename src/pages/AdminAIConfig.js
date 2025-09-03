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
  Switch,
  FormControlLabel,
  Slider,
  Divider
} from '@mui/material';
import { 
  SmartToy as SmartToyIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AdminAIConfig = () => {
  const [recommendationSettings, setRecommendationSettings] = useState({
    soilAnalysisWeight: 30,
    weatherForecastWeight: 25,
    historicalYieldWeight: 20,
    marketPriceWeight: 15,
    pestRiskWeight: 10
  });

  const handleSliderChange = (name) => (event, newValue) => {
    setRecommendationSettings({
      ...recommendationSettings,
      [name]: newValue
    });
  };

  const totalWeight = Object.values(recommendationSettings).reduce((sum, value) => sum + value, 0);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#FFFFFF', fontWeight: 500 }}>
          AI Configuration
        </Typography>
        
        <Grid container spacing={3}>
          {/* Recommendation Engine Settings */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Crop Recommendation Engine
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Adjust the weights for different factors in the crop recommendation algorithm:
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Soil Analysis: {recommendationSettings.soilAnalysisWeight}%
                        </Typography>
                        <Slider
                          value={recommendationSettings.soilAnalysisWeight}
                          onChange={handleSliderChange('soilAnalysisWeight')}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Weather Forecast: {recommendationSettings.weatherForecastWeight}%
                        </Typography>
                        <Slider
                          value={recommendationSettings.weatherForecastWeight}
                          onChange={handleSliderChange('weatherForecastWeight')}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Historical Yield: {recommendationSettings.historicalYieldWeight}%
                        </Typography>
                        <Slider
                          value={recommendationSettings.historicalYieldWeight}
                          onChange={handleSliderChange('historicalYieldWeight')}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Market Price: {recommendationSettings.marketPriceWeight}%
                        </Typography>
                        <Slider
                          value={recommendationSettings.marketPriceWeight}
                          onChange={handleSliderChange('marketPriceWeight')}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Pest Risk: {recommendationSettings.pestRiskWeight}%
                        </Typography>
                        <Slider
                          value={recommendationSettings.pestRiskWeight}
                          onChange={handleSliderChange('pestRiskWeight')}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={0}
                          max={100}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Total Weight: {totalWeight}%
                        </Typography>
                        {totalWeight !== 100 && (
                          <Typography variant="body2" sx={{ color: '#E53935' }}>
                            Warning: Total weight should equal 100%
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        startIcon={<RefreshIcon />}
                        sx={{ mr: 2, borderColor: '#FF9800', color: '#FF9800' }}
                      >
                        Reset to Defaults
                      </Button>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                        sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                      >
                        Save Configuration
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Pest Detection Settings */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Pest Detection Model
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Confidence Threshold</InputLabel>
                      <Select label="Confidence Threshold" defaultValue="medium">
                        <MenuItem value="low">Low (70%)</MenuItem>
                        <MenuItem value="medium">Medium (80%)</MenuItem>
                        <MenuItem value="high">High (90%)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable Real-time Scanning"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Model Update Frequency"
                      defaultValue="24"
                      helperText="Hours between model updates"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                        sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                      >
                        Save Settings
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Livestock Monitoring Settings */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Livestock Monitoring
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable Health Monitoring"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable Breeding Cycle Tracking"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Alert Threshold"
                      defaultValue="85"
                      helperText="Health score threshold for alerts (0-100)"
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Data Collection Interval"
                      defaultValue="15"
                      helperText="Minutes between data collections"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                        sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                      >
                        Save Settings
                      </Button>
                    </Box>
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

export default AdminAIConfig;