import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom";
import './index.css';
import LogIn from './pages/LogIn'
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './components/DashboardHome';
import StudentDashboard from "./pages/StudentDashboard";
import StudentsManagement from "./pages/StudentsManagement";
import StudentForm from './components/studentManagementComponents/StudentForm';
import GroupsManagement from './pages/GroupsManagement';
import GroupsForm from './components/groupsManagementComponents/GroupsForm';
import UsersManagement from './pages/UsersManagement';
import UsersForm from './components/usersManagementComponents/UsersForm'
import ProgramsManagement from './pages/ProgramsManagement';
import ProgramsForm from './components/programsManagementComponents/ProgramsForm';


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
         <Route path="groups" element={<GroupsManagement />} />
         <Route path="groups/form" element={<GroupsForm />} />
         <Route path="users" element={<UsersManagement />} />
         <Route path="users/form" element={<UsersForm />} />
         <Route path="programs" element={<ProgramsManagement />} />
         <Route path="programs/form" element={<ProgramsForm />} />
        </Route>

        {/* Cualquier ruta desconocida*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
