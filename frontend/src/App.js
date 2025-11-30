import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import './index.css';
import LogIn from './pages/LogIn'
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './components/DashboardHome';
import StudentDashboard from "./pages/StudentDashboard";
import StudentsManagement from "./pages/StudentsManagement";
import StudentForm from './components/studentManagementComponents/StudentForm';

function App() {
   return (
    //TODO separar rutas en archivos
    <BrowserRouter>
      <Routes>
        {/* Ruta default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas reales */}
        <Route path="/login" element={<LogIn />} />

        <Route path="/dashboard" element={<AdminLayout />}> 
         <Route index element={<DashboardHome />} />
         <Route path="student" element={<StudentDashboard />} />
         <Route path="students" element={<StudentsManagement />} />
         <Route path="students/form" element={<StudentForm />} />
        </Route>

        {/* Cualquier ruta desconocida*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
