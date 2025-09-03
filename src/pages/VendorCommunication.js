import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Forum as ForumIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const VendorCommunication = () => {
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const conversations = [
    { 
      id: 1, 
      name: 'John Farmer', 
      lastMessage: 'When will the fertilizer be delivered?', 
      time: '2 hours ago', 
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 2, 
      name: 'Mary Agriculturist', 
      lastMessage: 'Thanks for the quick delivery!', 
      time: '1 day ago', 
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 3, 
      name: 'Tom Grower', 
      lastMessage: 'Do you have the new seed variety?', 
      time: '2 days ago', 
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    { 
      id: 4, 
      name: 'Agro Co.', 
      lastMessage: 'We need 50 units of the pesticide', 
      time: '3 days ago', 
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
  ];

  // Mock messages data
  const messages = [
    { id: 1, sender: 'John Farmer', text: 'Hi, when will the fertilizer be delivered?', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'You', text: 'Hello! It will be delivered by Thursday.', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'John Farmer', text: 'Great, thanks! Will there be any discounts for bulk orders?', time: '10:35 AM', isMe: false },
    { id: 4, sender: 'You', text: 'Yes, we offer 10% discount for orders over 100kg.', time: '10:36 AM', isMe: true },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      alert('Message sent!');
      setMessage('');
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 500 }}>
            Customer Communication
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2 }}
              InputProps={{
                endAdornment: <SearchIcon />
              }}
            />
            <IconButton sx={{ color: '#FFFFFF' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
        
        <Grid container spacing={3} sx={{ height: '70vh' }}>
          {/* Conversations List */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5',
              height: '100%'
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ForumIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Conversations
                  </Typography>
                </Box>
                
                <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                  {conversations.map((conversation) => (
                    <React.Fragment key={conversation.id}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar alt={conversation.name} src={conversation.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {conversation.name}
                              </Typography>
                              {conversation.unread > 0 && (
                                <Badge badgeContent={conversation.unread} color="error" />
                              )}
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ display: 'block', color: 'text.primary' }}
                              >
                                {conversation.lastMessage}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9E9E9E' }}>
                                {conversation.time}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Chat Window */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                p: 0
              }}>
                {/* Chat Header */}
                <Box sx={{ 
                  p: 2, 
                  borderBottom: '1px solid #E0E0E0',
                  backgroundColor: '#2E7D32',
                  color: '#FFFFFF'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      alt="John Farmer" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
                      sx={{ mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        John Farmer
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Online
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Messages */}
                <Box sx={{ 
                  flexGrow: 1, 
                  overflow: 'auto', 
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {messages.map((msg) => (
                    <Box 
                      key={msg.id} 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      <Box sx={{ 
                        maxWidth: '70%', 
                        backgroundColor: msg.isMe ? '#2E7D32' : '#E0E0E0',
                        color: msg.isMe ? '#FFFFFF' : '#000000',
                        borderRadius: 2,
                        p: 2
                      }}>
                        <Typography variant="body1">{msg.text}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                {/* Message Input */}
                <Box sx={{ 
                  p: 2, 
                  borderTop: '1px solid #E0E0E0',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <IconButton sx={{ color: '#616161' }}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton sx={{ color: '#616161' }}>
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    sx={{ mx: 1 }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={handleSendMessage}
                    sx={{ backgroundColor: '#2E7D32', color: '#FFFFFF' }}
                  >
                    <SendIcon />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Communication Tips */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F5F5F5'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ForumIcon sx={{ mr: 1, color: '#2E7D32' }} />
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#000000' }}>
                    Communication Best Practices
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                      Response Time
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                      Respond to customer inquiries within 24 hours to maintain good customer relationships and build trust.
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                      Professional Tone
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                      Maintain a professional and friendly tone in all communications. Use clear and concise language.
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#2E7D32' }}>
                      Problem Resolution
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                      Address customer concerns promptly and offer solutions. Follow up to ensure satisfaction.
                    </Typography>
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

export default VendorCommunication;