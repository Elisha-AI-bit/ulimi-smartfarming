import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Define roles
export const roles = {
  ADMIN: 'admin',
  FARMER: 'farmer',
  BUYER: 'buyer',
  VENDOR: 'vendor'
};

// Define permissions based on the role requirements
const permissions = {
  // Admin permissions
  FULL_SYSTEM_ACCESS: 'full_system_access',
  MANAGE_USERS: 'manage_users',
  APPROVE_LISTINGS: 'approve_listings',
  MONITOR_IOT: 'monitor_iot',
  VIEW_ANALYTICS: 'view_analytics',
  OVERSEE_PAYMENTS: 'oversee_payments',
  CONFIGURE_AI: 'configure_ai',
  SEND_ANNOUNCEMENTS: 'send_announcements',
  MANAGE_SECURITY: 'manage_security',
  
  // Farmer permissions
  MANAGE_PROFILE: 'manage_profile',
  ADD_CROPS: 'add_crops',
  RECEIVE_RECOMMENDATIONS: 'receive_recommendations',
  VIEW_SOIL_HEALTH: 'view_soil_health',
  VIEW_WEATHER: 'view_weather',
  VIEW_IRRIGATION_ADVICE: 'view_irrigation_advice',
  ACCESS_FINANCIAL_INSIGHTS: 'access_financial_insights',
  SELL_PRODUCTS: 'sell_products',
  ACCESS_USSD_SMS: 'access_ussd_sms',
  
  // Buyer permissions
  MANAGE_ACCOUNT: 'manage_account',
  BROWSE_PRODUCTS: 'browse_products',
  BUY_PRODUCTS: 'buy_products',
  TRACK_ORDERS: 'track_orders',
  RATE_VENDORS: 'rate_vendors',
  RECEIVE_DELIVERY_UPDATES: 'receive_delivery_updates',
  ACCESS_NUTRITIONAL_ADVICE: 'access_nutritional_advice',
  
  // Vendor permissions
  MANAGE_VENDOR_PROFILE: 'manage_vendor_profile',
  LIST_PRODUCTS: 'list_products',
  GET_LISTING_APPROVAL: 'get_listing_approval',
  TRACK_SALES: 'track_sales',
  ACCESS_ANALYTICS: 'access_analytics',
  COMMUNICATE_WITH_FARMERS: 'communicate_with_farmers'
};

// Define role-based permissions
const rolePermissions = {
  [roles.ADMIN]: [
    permissions.FULL_SYSTEM_ACCESS,
    permissions.MANAGE_USERS,
    permissions.APPROVE_LISTINGS,
    permissions.MONITOR_IOT,
    permissions.VIEW_ANALYTICS,
    permissions.OVERSEE_PAYMENTS,
    permissions.CONFIGURE_AI,
    permissions.SEND_ANNOUNCEMENTS,
    permissions.MANAGE_SECURITY,
    permissions.BROWSE_PRODUCTS
  ],
  [roles.FARMER]: [
    permissions.MANAGE_PROFILE,
    permissions.ADD_CROPS,
    permissions.RECEIVE_RECOMMENDATIONS,
    permissions.VIEW_SOIL_HEALTH,
    permissions.VIEW_WEATHER,
    permissions.VIEW_IRRIGATION_ADVICE,
    permissions.ACCESS_FINANCIAL_INSIGHTS,
    permissions.SELL_PRODUCTS,
    permissions.ACCESS_USSD_SMS,
    permissions.BROWSE_PRODUCTS
  ],
  [roles.BUYER]: [
    permissions.MANAGE_ACCOUNT,
    permissions.BROWSE_PRODUCTS,
    permissions.BUY_PRODUCTS,
    permissions.TRACK_ORDERS,
    permissions.RATE_VENDORS,
    permissions.RECEIVE_DELIVERY_UPDATES,
    permissions.ACCESS_NUTRITIONAL_ADVICE
  ],
  [roles.VENDOR]: [
    permissions.MANAGE_VENDOR_PROFILE,
    permissions.LIST_PRODUCTS,
    permissions.GET_LISTING_APPROVAL,
    permissions.TRACK_SALES,
    permissions.ACCESS_ANALYTICS,
    permissions.COMMUNICATE_WITH_FARMERS,
    permissions.BROWSE_PRODUCTS
  ]
};

// Define navigation items for each role based on the requirements
const roleNavigation = {
  [roles.ADMIN]: [
    { text: 'Dashboard', path: '/admin', icon: 'DashboardIcon' },
    { text: 'User Management', path: '/admin/user-management', icon: 'PeopleIcon' },
    { text: 'Security Settings', path: '/admin/security', icon: 'SecurityIcon' },
    { text: 'Performance Metrics', path: '/admin/performance-metrics', icon: 'TrendingUpIcon' },
    { text: 'Payments Overview', path: '/admin/payments', icon: 'PaymentIcon' },
    { text: 'AI Configuration', path: '/admin/ai-config', icon: 'SmartToyIcon' },
    { text: 'System Reports', path: '/reports', icon: 'AssessmentIcon' },
    { text: 'Send Announcements', path: '/admin/announcements', icon: 'NotificationsIcon' }
  ],
  [roles.FARMER]: [
    { text: 'Dashboard', path: '/farmer', icon: 'DashboardIcon' },
    { text: 'Farm Management', path: '/farmer/farm-management', icon: 'AgricultureIcon' },
    { text: 'Crop Planning', path: '/farmer/crop-planning', icon: 'AgricultureIcon' },
    { text: 'Sensor Data', path: '/farmer/sensor-data', icon: 'DeviceHubIcon' },
    { text: 'Weather Forecast', path: '/farmer/weather', icon: 'WbSunnyIcon' },
    { text: 'AI Advisor', path: '/farmer/ai-advisor', icon: 'SmartToyIcon' },
    { text: 'Pest Detection', path: '/farmer/pest-detection', icon: 'BugReportIcon' },
    { text: 'Livestock Monitoring', path: '/farmer/livestock', icon: 'PetsIcon' },
    { text: 'Financial Insights', path: '/farmer/financials', icon: 'BarChartIcon' },
    { text: 'Marketplace', path: '/marketplace', icon: 'StoreIcon' },
    { text: 'Task Management', path: '/farmer/tasks', icon: 'TaskIcon' },
    { text: 'SMS/USSD Access', path: '/farmer/ussd', icon: 'ForumIcon' }
  ],
  [roles.BUYER]: [
    { text: 'Marketplace', path: '/marketplace', icon: 'StoreIcon' },
    { text: 'My Orders', path: '/buyer/orders', icon: 'ShoppingCartIcon' },
    { text: 'Wishlist', path: '/buyer/wishlist', icon: 'StarIcon' },
    { text: 'Nutritional Advice', path: '/buyer/nutrition', icon: 'RestaurantIcon' },
    { text: 'Account Settings', path: '/buyer/account', icon: 'SettingsIcon' }
  ],
  [roles.VENDOR]: [
    { text: 'Dashboard', path: '/vendor', icon: 'DashboardIcon' },
    { text: 'Product Management', path: '/vendor/products', icon: 'LocalOfferIcon' },
    { text: 'Sales Analytics', path: '/vendor/analytics', icon: 'BarChartIcon' },
    { text: 'Orders Management', path: '/vendor/orders', icon: 'PaymentIcon' },
    { text: 'Customer Communication', path: '/vendor/communication', icon: 'ForumIcon' },
    { text: 'Marketplace', path: '/marketplace', icon: 'StoreIcon' }
  ]
};

const RBACContext = createContext();

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

export const RBACProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState(roles.FARMER);

  // Update role when user changes
  useEffect(() => {
    if (user && user.role) {
      setCurrentRole(user.role);
    } else {
      // If no user or role, default to FARMER
      setCurrentRole(roles.FARMER);
    }
  }, [user]);

  // Check if user has a specific permission
  const hasPermission = (permission) => {
    const userPermissions = rolePermissions[currentRole] || [];
    return userPermissions.includes(permission);
  };

  // Get navigation items for the current role
  const getNavigationItems = () => {
    return roleNavigation[currentRole] || [];
  };

  // Get all permissions for the current role
  const getPermissions = () => {
    return rolePermissions[currentRole] || [];
  };

  const value = {
    userRole: currentRole,
    hasPermission,
    getNavigationItems,
    getPermissions,
    roles
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
};