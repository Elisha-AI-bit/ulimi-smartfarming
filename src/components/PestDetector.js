import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Alert, CardActions } from '@mui/material';
import { CloudUpload as CloudUploadIcon, BugReport as BugReportIcon } from '@mui/icons-material';

const PestDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock detection result
      const mockResult = {
        pest: 'Aphids',
        confidence: 92,
        recommendation: 'Apply neem oil spray to affected plants. Introduce ladybugs as natural predators.'
      };
      
      setDetectionResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="card-container">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BugReportIcon sx={{ mr: 1, color: '#2e7d32' }} />
          <Typography variant="h6" className="section-title">
            Pest & Disease Detection
          </Typography>
        </Box>
        
        <Box sx={{ border: '2px dashed #2e7d32', borderRadius: 2, p: 3, textAlign: 'center', mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-button"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-button">
            <Button 
              variant="outlined" 
              component="span" 
              startIcon={<CloudUploadIcon />}
              sx={{ 
                borderColor: '#2e7d32',
                color: '#2e7d32',
                '&:hover': {
                  borderColor: '#1b5e20',
                  backgroundColor: 'rgba(46, 125, 50, 0.04)'
                }
              }}
            >
              Choose Image
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {selectedFile.name}
            </Typography>
          )}
        </Box>
        
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="action-button"
          sx={{ 
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20'
            }
          }}
        >
          {loading ? 'Analyzing...' : 'Detect Pest/Disease'}
        </Button>
        
        {detectionResult && (
          <Box sx={{ mt: 2 }}>
            <Alert 
              severity="warning" 
              className="custom-alert"
              sx={{ 
                borderLeft: '4px solid #ff9800',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Detection Result</Typography>
              <Typography variant="body1"><strong>Pest:</strong> {detectionResult.pest}</Typography>
              <Typography variant="body1"><strong>Confidence:</strong> {detectionResult.confidence}%</Typography>
              <Typography variant="body1"><strong>Recommendation:</strong> {detectionResult.recommendation}</Typography>
            </Alert>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
        <Button size="small" color="primary">View History</Button>
      </CardActions>
    </Card>
  );
};

export default PestDetector;