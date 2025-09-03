import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  CssBaseline,
  Avatar,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard as DashboardIcon,
  BugReport as BugReportIcon,
  Store as StoreIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Agriculture as AgricultureIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
  Task as TaskIcon,
  Forum as ForumIcon,
  WbSunny as WbSunnyIcon,
  DeviceHub as DeviceHubIcon,
  SmartToy as SmartToyIcon,
  Pets as PetsIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DashboardLayout = ({ children, userRole, userName = "User" }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // In a real app, we would log out of Supabase here
    navigate('/');
    handleMenuClose();
  };

  const getMenuItems = () => {
    switch(userRole) {
      case 'farmer':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/farmer' },
          { text: 'Farm Management', icon: <AgricultureIcon />, path: '/farm-management' },
          { text: 'Task Management', icon: <TaskIcon />, path: '/task-management' },
          { text: 'Pest Detection', icon: <BugReportIcon />, path: '/pest-detection' },
          { text: 'AI Advisor', icon: <SmartToyIcon />, path: '/ai-advisor' },
          { text: 'Irrigation', icon: <DeviceHubIcon />, path: 'https://ulimi-iot.vercel.app/', external: true },
          { text: 'Weather', icon: <WbSunnyIcon />, path: '/weather' },
          { text: 'Marketplace', icon: <StoreIcon />, path: '/farmer' },
          { text: 'Livestock', icon: <PetsIcon />, path: '/livestock-monitoring' },
          { text: 'Sensor Data', icon: <TrendingUpIcon />, path: '/sensor-data' },
          { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
          { text: 'Community', icon: <ForumIcon />, path: '/community' },
        ];
      case 'admin':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
          { text: 'User Management', icon: <PeopleIcon />, path: '/user-management' },
          { text: 'Performance Metrics', icon: <TrendingUpIcon />, path: '/performance-metrics' },
          { text: 'Farmers', icon: <AgricultureIcon />, path: '/admin' },
          { text: 'Analytics', icon: <BarChartIcon />, path: '/admin' },
          { text: 'Reports', icon: <AssessmentIcon />, path: '/admin' },
        ];
      case 'buyer':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/buyer' },
          { text: 'Marketplace', icon: <StoreIcon />, path: '/buyer' },
          { text: 'Orders', icon: <AssessmentIcon />, path: '/buyer' },
        ];
      case 'vendor':
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/vendor' },
          { text: 'Product Management', icon: <StoreIcon />, path: '/product-management' },
          { text: 'Sales Analytics', icon: <BarChartIcon />, path: '/sales-analytics' },
          { text: 'Orders', icon: <AssessmentIcon />, path: '/vendor' },
        ];
      default:
        return [
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        ];
    }
  };

  const menuItems = getMenuItems();

  // Add a special "View All" button for farmers
  const renderFarmerViewButton = () => {
    if (userRole === 'farmer') {
      return (
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            fullWidth
            onClick={() => navigate('/reports')}
            sx={{ 
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#1b5e20'
              }
            }}
          >
            View All Reports
          </Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2e7d32' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <AgricultureIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Ulimi Smart Farming
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <NotificationsIcon sx={{ mr: 2 }} />
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff9800' }}>
              {userName.charAt(0)}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Typography variant="subtitle1">{userName}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => {
                  if (item.external) {
                    window.open(item.path, '_blank');
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(46, 125, 50, 0.08)' 
                  } 
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          {renderFarmerViewButton()}
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;