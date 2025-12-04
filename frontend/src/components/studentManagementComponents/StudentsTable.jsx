import { UserMinus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { deleteStudent, getStudents } from "../../services/Students.service";

export default function StudentsTable({ students = [] }) {

  const [tableData, setTableData] = useState([])
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null)

  const user = sessionStorage.getItem("userData")
    const userParsed = JSON.parse(user);
    const {role} = userParsed

  const studentAddForm = () => {
    navigate("form")
  }

  const studentEditForm = () => {
    navigate("form", { state: { selectedRow } })
  }

  const handleDelete = () => {
    console.log("ELIMINANDO")
    if (selectedRow.id) {
      if (window.confirm("Quieres eliminar este registro?")) {
        const { id } = selectedRow;
        const result = deleteStudent(id);
        console.log(result)
      }
      fetchData();
    } else {
      return
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await getStudents();
      const formatted = data.map(student => ({
        ...student,
        birthdate: student.birthdate.split("T")[0]  // "YYYY-MM-DD"
      }));
      setTableData(formatted)
      console.log(formatted)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
    console.log(tableData)
  }, [])




  console.log(students)
  return (


    <div className="overflow-x-auto">
      <div className="flex flex-row space-x-8 p-4">
        <button className="bg-green-600 rounded-md p-1 hover:bg-green-800 disabled:bg-green-800 disabled:cursor-not-allowed disabled:hover:bg-green-800" onClick={studentAddForm} disabled={role !== "admin" && role !== "master"}>Agregar</button>
        <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800 disabled:bg-orange-800 disabled:cursor-not-allowed disabled:hover:bg-orange-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={studentEditForm}>Editar</button>
        <button className="bg-red-600 rounded-md p-1 hover:bg-red-800 disabled:bg-red-800 disabled:cursor-not-allowed disabled:hover:bg-red-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={handleDelete}>Eliminar</button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">cedula</th>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Apellido</th>
            <th className="py-2 px-4 border-b text-left">Apellido</th>
            <th className="py-2 px-4 border-b text-left">Fecha Nacimiento</th>
            <th className="py-2 px-4 border-b text-left">Discapacidad</th>
            <th className="py-2 px-4 border-b text-left">Tutor</th>
            <th className="py-2 px-4 border-b text-left">Grupo</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((student) => (
            <tr key={student.id} onClick={() => {
              setSelectedRow(student)
              console.log(selectedRow)
            }} className={`cursor-pointer hover:bg-blue-200 ${selectedRow?.id === student.id ? "bg-blue-200" : ""}`}>
              <td className="py-2 px-4 border-b">{student.dni}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.lastname}</td>
              <td className="py-2 px-4 border-b">{student.second_lastname}</td>
              <td className="py-2 px-4 border-b">{student.birthdate}</td>
              <td className="py-2 px-4 border-b">{student.disability}</td>
              <td className="py-2 px-4 border-b">{student.tutor}</td>
              <td className="py-2 px-4 border-b">{student.group_id}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}