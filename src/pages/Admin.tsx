import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import AdminContent from '../components/admin/AdminContent';
import AdminReports from '../components/admin/AdminReports';
import AdminLayout from '../components/admin/AdminLayout';

export default function Admin() {
  const { user } = useAuth();

  // For demo purposes, allow access. In production, check user.role === 'admin'
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/content" element={<AdminContent />} />
        <Route path="/reports" element={<AdminReports />} />
      </Routes>
    </AdminLayout>
  );
}