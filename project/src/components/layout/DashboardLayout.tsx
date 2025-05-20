import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </div>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} VCET Hostel Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;