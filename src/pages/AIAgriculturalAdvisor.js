import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from '@mui/material';
import { 
  SmartToy as SmartToyIcon,
  Upload as UploadIcon,
  ExpandMore as ExpandMoreIcon,
  Grass as GrassIcon,
  BugReport as BugReportIcon,
  Water as WaterIcon,
  WbSunny as WbSunnyIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const AIAgriculturalAdvisor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  // Mock AI analysis results
  const mockAnalysisResults = {
    plantDisease: {
      disease: 'Early Blight',
      confidence: 92,
      description: 'A common fungal disease affecting tomato plants, causing dark spots on leaves.',
      treatment: [
        'Remove infected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation around plants',
        'Water at soil level, not on leaves'
      ],
      prevention: [
        'Rotate crops annually',
        'Space plants properly for air flow',
        'Mulch around base of plants',
        'Water in the morning so leaves dry quickly'
      ]
    },
    soilAnalysis: {
      ph: 6.8,
      nutrients: {
        nitrogen: 'adequate',
        phosphorus: 'low',
        potassium: 'adequate'
      },
      recommendations: [
        'Add bone meal to increase phosphorus levels',
        'Consider adding compost for overall soil health',
        'Test soil again in 4 weeks'
      ]
    }
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      
      // Simulate AI analysis
      setLoading(true);
      setTimeout(() => {
        setAnalysisResult(mockAnalysisResults.plantDisease);
        setLoading(false);
      }, 2000);
    }
  };

  const handleAskQuestion = () => {
    if (question.trim() === '') return;
    
    setLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAnalysisResult({
        question: question,
        answer: 'Based on current weather conditions and your soil type, I recommend planting drought-resistant varieties like Roma tomatoes. These require less water and can handle heat stress better than other varieties.',
        confidence: 85
      });
      setLoading(false);
      setQuestion('');
    }, 1500);
  };

  const getNutrientColor = (level) => {
    switch(level) {
      case 'high': return 'success';
      case 'adequate': return 'warning';
      case 'low': return 'error';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          AI Agricultural Advisor
        </Typography>
        
        <Grid container spacing={2}>
          {/* Image Analysis Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 2, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BugReportIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Plant Disease Detection
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    border: '2px dashed #ccc', 
                    borderRadius: 2, 
                    p: 3, 
                    textAlign: 'center', 
                    mb: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Uploaded" 
                      style={{ maxWidth: '100%', maxHeight: 200 }} 
                    />
                  ) : (
                    <>
                      <UploadIcon sx={{ fontSize: 48, color: '#9e9e9e', mb: 1 }} />
                      <Typography variant="body1" color="textSecondary">
                        Upload an image of your plant for disease analysis
                      </Typography>
                      <Button 
                        variant="outlined" 
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('image-upload').click();
                        }}
                      >
                        Choose Image
                      </Button>
                    </>
                  )}
                </Box>
                
                {loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                  </Box>
                )}
                
                {analysisResult && analysisResult.disease && (
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1, color: '#f44336' }}>
                        {analysisResult.disease} Detected
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Confidence: {analysisResult.confidence}%
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {analysisResult.description}
                      </Typography>
                      
                      <Accordion sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Treatment Recommendations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul>
                            {analysisResult.treatment.map((tip, index) => (
                              <li key={index} style={{ marginBottom: 8 }}>
                                <Typography variant="body2">{tip}</Typography>
                              </li>
                            ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Prevention Tips</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul>
                            {analysisResult.prevention.map((tip, index) => (
                              <li key={index} style={{ marginBottom: 8 }}>
                                <Typography variant="body2">{tip}</Typography>
                              </li>
                            ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Question & Answer Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 2, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Ask the AI Advisor
                  </Typography>
                </Box>
                
                <TextField
                  label="Ask a question about farming..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAskQuestion}
                  disabled={loading}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Ask Question'}
                </Button>
                
                {analysisResult && analysisResult.question && (
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        Question: {analysisResult.question}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {analysisResult.answer}
                      </Typography>
                      <Chip 
                        label={`Confidence: ${analysisResult.confidence}%`} 
                        color="success" 
                        size="small" 
                      />
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
            
            {/* Quick Tips */}
            <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WbSunnyIcon sx={{ mr: 1, color: '#ff9800' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Today's Farming Tips
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Chip 
                      icon={<GrassIcon />} 
                      label="Check soil moisture levels before irrigating" 
                      variant="outlined" 
                      sx={{ width: '100%', justifyContent: 'flex-start' }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Chip 
                      icon={<BugReportIcon />} 
                      label="Inspect tomato plants for early blight symptoms" 
                      variant="outlined" 
                      sx={{ width: '100%', justifyContent: 'flex-start' }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Chip 
                      icon={<WaterIcon />} 
                      label="Water in the morning to reduce evaporation" 
                      variant="outlined" 
                      sx={{ width: '100%', justifyContent: 'flex-start' }} 
                    />
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

export default AIAgriculturalAdvisor;