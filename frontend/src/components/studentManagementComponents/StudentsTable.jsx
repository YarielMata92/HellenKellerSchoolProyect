import { UserMinus } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

export default function StudentsTable({ students = [] }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [student, setStudent] = useState({})
  const navigate = useNavigate();

  const studentForm = ()=>{
        if(student.id>0){
          console.log("studentForm edit")

        }else{
          console.log("studentForm add")
            navigate("form");
        }
    }

  // Filtrado
  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  // Ordenamiento
  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, sortConfig]);

  // Paginación
  const pageCount = Math.ceil(sortedStudents.length / itemsPerPage);
  const currentItems = sortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar orden
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-4">

      <h2 className="text-xl font-bold mb-4">Estudiantes</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />

      <div className="overflow-x-auto">
        <div className="flex flex-row space-x-8 p-4">
            <button className="bg-green-600 rounded-md p-1 hover:bg-green-800" onClick={studentForm}>Agregar</button>
            <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800">Editar</button>
            <button className="bg-red-600 rounded-md p-1 hover:bg-red-800">Eliminar</button>
        </div>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort("id")}
              >
                ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Nombre {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort("email")}
              >
                Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort("age")}
              >
                Edad {sortConfig.key === "age" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{student.id}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.email}</td>
                <td className="py-2 px-4 border-b">{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}