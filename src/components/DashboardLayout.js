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
  useMediaQuery,
  Tooltip
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
  Payment as PaymentIcon,
  Security as SecurityIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  LocalOffer as LocalOfferIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRBAC } from '../context/RBACContext';

// Map icon names to actual components
const iconMap = {
  DashboardIcon: <DashboardIcon />,
  BugReportIcon: <BugReportIcon />,
  StoreIcon: <StoreIcon />,
  AssessmentIcon: <AssessmentIcon />,
  PeopleIcon: <PeopleIcon />,
  SettingsIcon: <SettingsIcon />,
  AgricultureIcon: <AgricultureIcon />,
  BarChartIcon: <BarChartIcon />,
  TaskIcon: <TaskIcon />,
  ForumIcon: <ForumIcon />,
  WbSunnyIcon: <WbSunnyIcon />,
  DeviceHubIcon: <DeviceHubIcon />,
  SmartToyIcon: <SmartToyIcon />,
  PetsIcon: <PetsIcon />,
  TrendingUpIcon: <TrendingUpIcon />,
  PaymentIcon: <PaymentIcon />,
  SecurityIcon: <SecurityIcon />,
  ShoppingCartIcon: <ShoppingCartIcon />,
  StarIcon: <StarIcon />,
  RestaurantIcon: <RestaurantIcon />,
  LocalOfferIcon: <LocalOfferIcon />,
  HomeIcon: <HomeIcon />
};

const drawerWidth = 260;

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { logout, user } = useAuth();
  const { userRole, getNavigationItems } = useRBAC();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    if (open && !isMobile) {
      setOpen(false);
    } else if (isMobile) {
      setOpen(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const menuItems = getNavigationItems();

  // Find active item based on current location
  const activeItem = menuItems.find(item => location.pathname === item.path);

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default',
      width: '100%'
    }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#2e7d32',
          color: '#ffffff',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar sx={{ pr: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ 
              mr: 2,
              ...(open && !isMobile && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              Ulimi Smart Farming
            </Typography>
            {activeItem && (
              <Typography variant="body2" color="inherit" sx={{ opacity: 0.9 }}>
                {activeItem.text}
              </Typography>
            )}
          </Box>
          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 1 }}
          >
            <HomeIcon />
          </IconButton>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ mr: 1 }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: '#FBC02D', 
                  color: '#000000',
                  fontSize: '0.875rem'
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : (userRole ? userRole.charAt(0).toUpperCase() : 'U')}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: '#2e7d32',
            color: '#ffffff',
            borderRight: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            transition: 'width 0.3s ease'
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AgricultureIcon sx={{ color: '#FBC02D', mr: 1 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: '#FBC02D' }}>
              Ulimi
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#ffffff' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ py: 1 }}>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => {
                  if (isMobile) {
                    handleDrawerClose();
                  }
                  if (item.external) {
                    window.open(item.path, '_blank');
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{ 
                  borderRadius: '0 50px 50px 0',
                  mx: 1,
                  my: 0.5,
                  '&:hover': { 
                    backgroundColor: 'rgba(251, 192, 45, 0.2)'
                  },
                  ...(location.pathname === item.path && {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#FBC02D'
                    },
                    '& .MuiListItemText-primary': {
                      color: '#FBC02D',
                      fontWeight: 600
                    }
                  })
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: '#ffffff',
                    ...(location.pathname === item.path && {
                      color: '#FBC02D'
                    })
                  }}
                >
                  {iconMap[item.icon] || <DashboardIcon />}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    sx: {
                      color: '#ffffff',
                      ...(location.pathname === item.path && {
                        color: '#FBC02D',
                        fontWeight: 600
                      }),
                      fontSize: '0.875rem'
                    }
                  }} 
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <List sx={{ py: 1 }}>
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{ 
                borderRadius: '0 50px 50px 0',
                mx: 1,
                my: 0.5,
                '&:hover': { 
                  backgroundColor: 'rgba(251, 192, 45, 0.2)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#ffffff' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{ 
                  sx: {
                    color: '#ffffff',
                    fontSize: '0.875rem'
                  }
                }} 
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease'
        }}
      >
        <Toolbar />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;