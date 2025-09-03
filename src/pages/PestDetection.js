import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  BugReport as BugReportIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const PestDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedPest, setSelectedPest] = useState(null);

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
        severity: 'Medium',
        details: {
          description: 'Small sap-sucking insects that cluster on leaves and stems',
          lifecycle: 'Eggs → Nymphs → Adults (7-10 days)',
          damage: 'Yellowing leaves, stunted growth, honeydew secretion',
          prevention: 'Regular inspection, beneficial insects, crop rotation'
        }
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

  const handleViewDetailedReport = () => {
    setViewDetailsOpen(true);
  };

  const handleCloseDetailedReport = () => {
    setViewDetailsOpen(false);
  };

  const handleViewPestDetails = (pest) => {
    setSelectedPest(pest);
  };

  const handleClosePestDetails = () => {
    setSelectedPest(null);
  };

  // Detailed pest information
  const pestDetails = {
    'Aphids': {
      description: 'Small sap-sucking insects that cluster on leaves and stems',
      lifecycle: 'Eggs → Nymphs → Adults (7-10 days)',
      damage: 'Yellowing leaves, stunted growth, honeydew secretion leading to sooty mold',
      treatment: 'Apply neem oil or insecticidal soap, introduce ladybugs as natural predators',
      prevention: 'Regular inspection, beneficial insects, crop rotation, reflective mulch'
    },
    'Spider Mites': {
      description: 'Tiny arachnids that feed on plant sap, often found on the undersides of leaves',
      lifecycle: 'Eggs → Larvae → Protonymphs → Adults (5-20 days depending on temperature)',
      damage: 'Fine webbing on leaves, stippled yellow or bronze foliage, leaf drop',
      treatment: 'Water spray to dislodge mites, predatory mites, horticultural oils',
      prevention: 'Maintain proper humidity, avoid water stress, remove infested plant parts'
    },
    'Whiteflies': {
      description: 'Small, white moth-like insects that fly when plants are disturbed',
      lifecycle: 'Eggs → Four nymph stages → Adults (2-4 weeks)',
      damage: 'Yellowing leaves, stunted growth, honeydew secretion leading to sooty mold',
      treatment: 'Yellow sticky traps, neem oil, insecticidal soap, reflective mulch',
      prevention: 'Inspect new plants before introducing, remove weeds, use row covers'
    },
    'Caterpillars': {
      description: 'Larvae of moths and butterflies that chew on leaves and fruits',
      lifecycle: 'Eggs → Larvae (caterpillars) → Pupae → Adults (1-3 months)',
      damage: 'Holes in leaves, defoliation, frass (droppings) on leaves',
      treatment: 'Bacillus thuringiensis (Bt), hand picking, beneficial insects like parasitic wasps',
      prevention: 'Row covers, companion planting, encouraging beneficial insects'
    }
  };

  const commonPests = [
    { pest: 'Aphids', treatment: 'Neem oil, insecticidal soap', severity: 'Medium' },
    { pest: 'Spider Mites', treatment: 'Predatory mites, water spray', severity: 'High' },
    { pest: 'Whiteflies', treatment: 'Yellow sticky traps, neem oil', severity: 'Medium' },
    { pest: 'Caterpillars', treatment: 'Bacillus thuringiensis, hand picking', severity: 'High' }
  ];

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 500 }}>
            Pest Detection
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<VisibilityIcon />}
            onClick={() => setViewDetailsOpen(true)}
            sx={{ 
              borderColor: '#2e7d32',
              color: '#2e7d32'
            }}
          >
            View All Reports
          </Button>
        </Box>
        
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
                    startIcon={<VisibilityIcon />}
                    onClick={handleViewDetailedReport}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    Common Pests & Treatments
                  </Typography>
                  <Button 
                    size="small" 
                    startIcon={<InfoIcon />}
                    sx={{ color: '#2e7d32' }}
                  >
                    Learn More
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {commonPests.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {item.pest}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {item.treatment}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip 
                              label={item.severity} 
                              color={getSeverityColor(item.severity)} 
                              size="small"
                            />
                            <Button 
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => handleViewPestDetails({...item, details: pestDetails[item.pest]})}
                              sx={{ minWidth: 0, padding: 0 }}
                            >
                              View
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
        </Grid>
      </Box>

      {/* Detailed Report Dialog */}
      <Dialog open={viewDetailsOpen} onClose={handleCloseDetailedReport} maxWidth="md" fullWidth>
        <DialogTitle>
          Pest Detection Report
        </DialogTitle>
        <DialogContent>
          {analysisResult && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BugReportIcon sx={{ mr: 1, color: '#2e7d32' }} />
                <Typography variant="h6">
                  {analysisResult.pestType} Detection
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                        Detection Summary
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText 
                            primary="Pest Type" 
                            secondary={analysisResult.pestType}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Confidence Level" 
                            secondary={analysisResult.confidence}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Severity" 
                            secondary={
                              <Chip 
                                label={analysisResult.severity} 
                                color={getSeverityColor(analysisResult.severity)} 
                                size="small"
                              />
                            }
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                        Treatment Plan
                      </Typography>
                      <Typography variant="body1">
                        {analysisResult.treatment}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                        Detailed Information
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText 
                            primary="Description" 
                            secondary={analysisResult.details.description}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Lifecycle" 
                            secondary={analysisResult.details.lifecycle}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Damage Symptoms" 
                            secondary={analysisResult.details.damage}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Prevention Methods" 
                            secondary={analysisResult.details.prevention}
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {!analysisResult && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                No pest detection report available. Please upload an image for analysis.
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                Previous Reports
              </Typography>
              <List>
                {[
                  { date: '2023-05-15', pest: 'Aphids', severity: 'Medium' },
                  { date: '2023-05-10', pest: 'Spider Mites', severity: 'High' },
                  { date: '2023-04-22', pest: 'Whiteflies', severity: 'Low' }
                ].map((report, index) => (
                  <ListItem key={index} divider>
                    <ListItemText 
                      primary={`${report.pest} - ${report.date}`} 
                      secondary={
                        <Chip 
                          label={report.severity} 
                          color={getSeverityColor(report.severity)} 
                          size="small"
                        />
                      }
                    />
                    <Button 
                      startIcon={<VisibilityIcon />}
                      onClick={() => console.log('View report', report)}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailedReport}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Pest Details Dialog */}
      <Dialog open={!!selectedPest} onClose={handleClosePestDetails} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPest?.pest} Details
        </DialogTitle>
        <DialogContent>
          {selectedPest && (
            <Box>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Description" 
                    secondary={selectedPest.details?.description || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Lifecycle" 
                    secondary={selectedPest.details?.lifecycle || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Damage Symptoms" 
                    secondary={selectedPest.details?.damage || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Treatment" 
                    secondary={selectedPest.treatment || selectedPest.details?.treatment || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Prevention" 
                    secondary={selectedPest.details?.prevention || 'N/A'}
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePestDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default PestDetection;