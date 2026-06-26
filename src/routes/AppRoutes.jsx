import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import { useStore } from "../store/useStore";

// Route Guard to block unauthenticated/unconfigured navigation
const RouteGuard = ({ children, level = 1 }) => {
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const categories = useStore((state) => state.categories);

  // Level 1: Requires registration and active authentication
  if (level >= 1) {
    const isRegistered = user.name && user.username && user.email && user.mobile;
    
    if (!isRegistered) {
      return <Navigate to="/" replace />;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  }

  // Level 2: Requires at least 3 categories selected
  if (level >= 2) {
    if (categories.length < 3) {
      return <Navigate to="/categories" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public/Initial Registration page */}
      <Route path="/" element={<Register />} />
      
      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Categories page - Needs user registration */}
      <Route 
        path="/categories" 
        element={
          <RouteGuard level={1}>
            <Categories />
          </RouteGuard>
        } 
      />

      {/* Dashboard - Needs user registration & 3 categories */}
      <Route 
        path="/dashboard" 
        element={
          <RouteGuard level={2}>
            <Dashboard />
          </RouteGuard>
        } 
      />

      {/* Movie recommendations - Needs user registration & 3 categories */}
      <Route 
        path="/movies" 
        element={
          <RouteGuard level={2}>
            <Movies />
          </RouteGuard>
        } 
      />

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
