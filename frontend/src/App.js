import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import './index.css';
import LogIn from './pages/LogIn'
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './components/DashboardHome';

function App() {
   return (
    <BrowserRouter>
      <Routes>
        {/* Ruta default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas reales */}
        <Route path="/login" element={<LogIn />} />

        <Route path="/dashboard" element={<AdminLayout />}> 
         <Route index element={<DashboardHome />} />
        </Route>

        {/* Cualquier ruta desconocida*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
