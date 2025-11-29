import Navbar from '../components/Navbar.jsx'
import { Outlet, Navigate } from "react-router-dom";

export default function AdminLayout(){

    const isLogged = sessionStorage.getItem('userData')
    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }
    return (
    <div className="flex h-screen">
      <Navbar />

      <div className="flex-1 overflow-auto min-h-screen mt-12 bg-orange-300">
        <Outlet />
      </div>
    </div>
  );
}