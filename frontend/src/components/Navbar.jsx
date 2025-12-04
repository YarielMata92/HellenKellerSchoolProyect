import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const rolUsuario = sessionStorage.getItem("userData")
  const userData = JSON.parse(rolUsuario); // ahora sí es un objeto

  const role = userData.role;

  const handleLogout = ()=>{
    sessionStorage.clear();
    navigate("/")

  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#1791cd] shadow-md z-50">
      <nav className="flex items-center justify-between px-4 py-3">

        {/* CONTENEDOR IZQUIERDO: HAMBURGUESA + TÍTULO */}
        <div className="flex items-center gap-3">
          <button
            className="text-white"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>

          <h1 className="text-xl font-bold text-white">
            Hellen Keller
          </h1>
        </div>

      </nav>

      {/* Overlay oscuro */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40"
        ></div>
      )}

      {/* Sidebar izquierdo */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-4 text-gray-700">
          <Link to="" className="hover:text-[#1791cd]">
              Inicio
            </Link>

          {role === 'master' ? (
            <Link to="users" className="hover:text-[#1791cd]">
              Usuarios
            </Link>
          ) : null}

          {role === 'master' || role === 'therapist' || role === 'teacher' ? (
            <Link to="students" className="hover:text-[#1791cd]">
              Estudiantes
            </Link>
          ) : null}

          {role === 'master' ? (
            <Link to="Programs" className="hover:text-[#1791cd]">
              Programas
            </Link>
          ) : null}

          {role === 'master' || role === 'therapist' || role === 'teacher' ? (
            <Link to="groups" className="hover:text-[#1791cd]">
              Grupos
            </Link>
          ) : null}

          {role === 'master' || role === 'therapist' || role === 'teacher' ? (
            <Link to="individualplans" className="hover:text-[#1791cd]">
              Planes
            </Link>
          ) : null}

          <li>
            <a
              onClick={handleLogout}
              className="hover:text-[#1791cd] cursor-pointer"
            >
              LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}