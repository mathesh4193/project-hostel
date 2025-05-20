import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet 
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import WardenDashboard from './pages/warden/WardenDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/Profile';
import DashboardLayout from './components/layout/DashboardLayout';

// Protected route component
const ProtectedRoute = ({ 
  allowedRoles,
}: { 
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    // Redirect to the appropriate dashboard based on user role
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (currentUser.role === 'warden') {
      return <Navigate to="/warden/dashboard" replace />;
    } else {
      return <Navigate to="/student/dashboard" replace />;
    }
  }
  
  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes with DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Shared routes */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Role-specific routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/warden/dashboard" element={<WardenDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        
        {/* Default route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;