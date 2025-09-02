import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  Chip
} from '@mui/material';
import { 
  BugReport as BugReportIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const PestDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis result
      const mockResult = {
        pestType: 'Aphids',
        confidence: '92%',
        treatment: 'Apply neem oil or insecticidal soap',
        severity: 'Medium'
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Pest Detection
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BugReportIcon sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Upload Image for Analysis
                  </Typography>
                </Box>
                
                <TextField
                  fullWidth
                  type="file"
                  variant="outlined"
                  onChange={handleFileChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ mb: 2 }}
                />
                
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<UploadIcon />}
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze for Pests'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          {analysisResult && (
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BugReportIcon sx={{ mr: 1, color: '#2e7d32' }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      Analysis Result
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Pest Detected:</strong> {analysisResult.pestType}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Confidence:</strong> {analysisResult.confidence}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Severity:</strong> 
                      <Chip 
                        label={analysisResult.severity} 
                        color={getSeverityColor(analysisResult.severity)} 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Recommended Treatment:</strong> {analysisResult.treatment}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{ 
                      borderColor: '#2e7d32',
                      color: '#2e7d32',
                      '&:hover': {
                        borderColor: '#1b5e20',
                        backgroundColor: 'rgba(46, 125, 50, 0.04)'
                      }
                    }}
                  >
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' 
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: '#2e7d32' }}>
                  Common Pests & Treatments
                </Typography>
                
                <Grid container spacing={2}>
                  {[
                    { pest: 'Aphids', treatment: 'Neem oil, insecticidal soap', severity: 'Medium' },
                    { pest: 'Spider Mites', treatment: 'Predatory mites, water spray', severity: 'High' },
                    { pest: 'Whiteflies', treatment: 'Yellow sticky traps, neem oil', severity: 'Medium' },
                    { pest: 'Caterpillars', treatment: 'Bacillus thuringiensis, hand picking', severity: 'High' }
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {item.pest}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {item.treatment}
                          </Typography>
                          <Chip 
                            label={item.severity} 
                            color={getSeverityColor(item.severity)} 
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default PestDetection;