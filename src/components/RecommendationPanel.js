import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';

const RecommendationPanel = () => {
  // Mock recommendations
  const recommendations = [
    { id: 1, type: 'Irrigation', message: 'Irrigate field A in 2 hours', priority: 'high' },
    { id: 2, type: 'Fertilizer', message: 'Apply nitrogen fertilizer to field B', priority: 'medium' },
    { id: 3, type: 'Pest Control', message: 'Check for aphids in greenhouse section 3', priority: 'low' },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card className="card-container">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ mr: 1, color: '#ff9800' }} />
          <Typography variant="h6" className="section-title">
            AI Recommendations
          </Typography>
        </Box>
        <List>
          {recommendations.map((rec) => (
            <ListItem key={rec.id} divider sx={{ py: 1.5 }}>
              <ListItemText 
                primary={rec.message} 
                secondary={
                  <Chip 
                    label={rec.type} 
                    size="small" 
                    variant="outlined" 
                    sx={{ mt: 0.5, borderColor: '#2e7d32', color: '#2e7d32' }}
                  />
                }
              />
              <Chip 
                label={rec.priority} 
                color={getPriorityColor(rec.priority)} 
                size="small"
                sx={{ minWidth: 70 }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecommendationPanel;