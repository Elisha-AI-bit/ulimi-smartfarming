import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import FarmerDashboard from '../pages/FarmerDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import BuyerInterface from '../pages/BuyerInterface';
import VendorPortal from '../pages/VendorPortal';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LandingPage from '../pages/LandingPage';
import TaskManagement from '../pages/TaskManagement';
import CommunityForum from '../pages/CommunityForum';
import WeatherIntegration from '../pages/WeatherIntegration';
import AIAgriculturalAdvisor from '../pages/AIAgriculturalAdvisor';
import FarmManagement from '../pages/FarmManagement';
import UserManagement from '../pages/UserManagement';
import SensorData from '../pages/SensorData';
import PestDetection from '../pages/PestDetection';
import LivestockMonitoring from '../pages/LivestockMonitoring';
import Reports from '../pages/Reports';
import PerformanceMetrics from '../pages/PerformanceMetrics';
import ProductManagement from '../pages/ProductManagement';
import SalesAnalytics from '../pages/SalesAnalytics';

// Import new pages that need to be created
import AdminSecuritySettings from '../pages/AdminSecuritySettings';
import AdminPayments from '../pages/AdminPayments';
import AdminAIConfig from '../pages/AdminAIConfig';
import AdminAnnouncements from '../pages/AdminAnnouncements';
import FarmerCropPlanning from '../pages/FarmerCropPlanning';
import FarmerWeather from '../pages/FarmerWeather';
import FarmerFinancials from '../pages/FarmerFinancials';
import FarmerUSSD from '../pages/FarmerUSSD';
import BuyerOrders from '../pages/BuyerOrders';
import BuyerWishlist from '../pages/BuyerWishlist';
import BuyerNutrition from '../pages/BuyerNutrition';
import BuyerAccount from '../pages/BuyerAccount';
import VendorOrders from '../pages/VendorOrders';
import VendorCommunication from '../pages/VendorCommunication';
import Marketplace from '../pages/Marketplace';

// Import ProtectedRoute component
import ProtectedRoute from '../components/ProtectedRoute';
import { roles } from '../context/RBACContext';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/user-management" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <UserManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/security" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <AdminSecuritySettings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/performance-metrics" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <PerformanceMetrics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/payments" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <AdminPayments />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/ai-config" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <AdminAIConfig />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/announcements" 
        element={
          <ProtectedRoute requiredRole={roles.ADMIN}>
            <AdminAnnouncements />
          </ProtectedRoute>
        } 
      />
      
      {/* Farmer Routes */}
      <Route 
        path="/farmer" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/farm-management" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/crop-planning" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmerCropPlanning />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/sensor-data" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <SensorData />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/weather" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmerWeather />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/ai-advisor" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <AIAgriculturalAdvisor />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/pest-detection" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <PestDetection />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/livestock" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <LivestockMonitoring />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/financials" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmerFinancials />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/tasks" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <TaskManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/farmer/ussd" 
        element={
          <ProtectedRoute requiredRole={roles.FARMER}>
            <FarmerUSSD />
          </ProtectedRoute>
        } 
      />
      
      {/* Buyer Routes */}
      <Route 
        path="/buyer" 
        element={
          <ProtectedRoute requiredRole={roles.BUYER}>
            <Marketplace />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/marketplace" 
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/buyer/orders" 
        element={
          <ProtectedRoute requiredRole={roles.BUYER}>
            <BuyerOrders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/buyer/wishlist" 
        element={
          <ProtectedRoute requiredRole={roles.BUYER}>
            <BuyerWishlist />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/buyer/nutrition" 
        element={
          <ProtectedRoute requiredRole={roles.BUYER}>
            <BuyerNutrition />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/buyer/account" 
        element={
          <ProtectedRoute requiredRole={roles.BUYER}>
            <BuyerAccount />
          </ProtectedRoute>
        } 
      />
      
      {/* Vendor Routes */}
      <Route 
        path="/vendor" 
        element={
          <ProtectedRoute requiredRole={roles.VENDOR}>
            <VendorPortal />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/products" 
        element={
          <ProtectedRoute requiredRole={roles.VENDOR}>
            <ProductManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/analytics" 
        element={
          <ProtectedRoute requiredRole={roles.VENDOR}>
            <SalesAnalytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/orders" 
        element={
          <ProtectedRoute requiredRole={roles.VENDOR}>
            <VendorOrders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/communication" 
        element={
          <ProtectedRoute requiredRole={roles.VENDOR}>
            <VendorCommunication />
          </ProtectedRoute>
        } 
      />
      
      {/* Shared Routes */}
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <CommunityForum />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRouter;