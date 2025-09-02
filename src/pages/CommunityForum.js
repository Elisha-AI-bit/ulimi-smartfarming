import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  IconButton
} from '@mui/material';
import { 
  Forum as ForumIcon,
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Farmer Sarah',
      avatar: 'S',
      time: '2 hours ago',
      content: 'Has anyone had success with organic pest control for aphids? My tomatoes are being overrun!',
      likes: 5,
      comments: 3,
      tags: ['Pest Control', 'Organic Farming']
    },
    {
      id: 2,
      user: 'Agricultural Expert',
      avatar: 'E',
      time: '1 day ago',
      content: 'Tips for improving soil health in clay soils: Add organic matter, use cover crops, and avoid compaction.',
      likes: 12,
      comments: 7,
      tags: ['Soil Health', 'Tips']
    },
    {
      id: 3,
      user: 'Vendor Mike',
      avatar: 'M',
      time: '3 days ago',
      content: 'Just received a new shipment of organic fertilizers. DM me for details!',
      likes: 8,
      comments: 2,
      tags: ['Fertilizers', 'Organic']
    }
  ]);
  
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({
    1: [
      { id: 1, user: 'Tom the Farmer', content: 'Try neem oil spray, it works wonders!', time: '1 hour ago' },
      { id: 2, user: 'Jane Expert', content: 'Ladybugs are natural predators of aphids. Release them in your greenhouse.', time: '30 minutes ago' }
    ]
  });
  
  const [showComments, setShowComments] = useState({});

  const handleAddPost = () => {
    if (newPost.trim() === '') return;
    
    const post = {
      id: posts.length + 1,
      user: 'Current User',
      avatar: 'U',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
      tags: []
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId]
    });
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Community Forum
        </Typography>
        
        {/* Create Post */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Share with the Community
            </Typography>
            <TextField
              label="What would you like to discuss?"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button 
              variant="contained" 
              endIcon={<SendIcon />}
              onClick={handleAddPost}
              sx={{ 
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Post
            </Button>
          </CardContent>
        </Card>
        
        {/* Forum Posts */}
        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ForumIcon sx={{ mr: 1, color: '#2e7d32' }} />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Recent Discussions
              </Typography>
            </Box>
            <List>
              {posts.map((post) => (
                <Box key={post.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#2e7d32' }}>{post.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {post.user}
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                            {post.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {post.content}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                            {post.tags.map((tag, index) => (
                              <Chip key={index} label={tag} size="small" variant="outlined" />
                            ))}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                              startIcon={<ThumbUpIcon />} 
                              size="small"
                              sx={{ textTransform: 'none' }}
                            >
                              {post.likes} Likes
                            </Button>
                            <Button 
                              startIcon={<CommentIcon />} 
                              size="small"
                              onClick={() => toggleComments(post.id)}
                              sx={{ textTransform: 'none' }}
                            >
                              {post.comments} Comments
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {showComments[post.id] && (
                    <Box sx={{ ml: 4, mb: 2 }}>
                      {comments[post.id] && comments[post.id].map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12, mr: 1 }}>U</Avatar>
                            <Typography variant="subtitle2">{comment.user}</Typography>
                            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                              {comment.time}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ ml: 4 }}>
                            {comment.content}
                          </Typography>
                        </Box>
                      ))}
                      <TextField
                        placeholder="Add a comment..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  )}
                  <Divider variant="inset" component="li" />
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default CommunityForum;