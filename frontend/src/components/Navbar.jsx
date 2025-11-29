import { useState } from "react";
import { Menu, X } from "lucide-react"; // opcional, icons


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#1791cd] shadow-md z-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-white">
            Hellen Keller
        </h1>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Links en pantallas grandes */}
        <div className="hidden md:flex gap-6 text-white">
          <a href="#" className="hover:text-gray-400">Inicio</a>
          <a href="#" className="hover:text-gray-400">Servicios</a>
          <a href="#" className="hover:text-gray-400">Contacto</a>
        </div>
      </nav>

      {/* Overlay oscuro */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
        ></div>
      )}

      {/* Sidebar izquierdo */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-4 text-gray-700">
          <li><a href="#" className="hover:text-green-600">Inicio</a></li>
          <li><a href="#" className="hover:text-green-600">Servicios</a></li>
          <li><a href="#" className="hover:text-green-600">Contacto</a></li>
        </ul>
      </div>
    </div>
  );
}