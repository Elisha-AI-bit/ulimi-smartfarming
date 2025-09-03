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

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/farmer" element={<FarmerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/buyer" element={<BuyerInterface />} />
      <Route path="/vendor" element={<VendorPortal />} />
      <Route path="/task-management" element={<TaskManagement />} />
      <Route path="/community" element={<CommunityForum />} />
      <Route path="/weather" element={<WeatherIntegration />} />
      <Route path="/ai-advisor" element={<AIAgriculturalAdvisor />} />
      <Route path="/farm-management" element={<FarmManagement />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/sensor-data" element={<SensorData />} />
      <Route path="/pest-detection" element={<PestDetection />} />
      <Route path="/livestock-monitoring" element={<LivestockMonitoring />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/performance-metrics" element={<PerformanceMetrics />} />
      <Route path="/product-management" element={<ProductManagement />} />
      <Route path="/sales-analytics" element={<SalesAnalytics />} />
    </Routes>
  );
};

export default AppRouter;