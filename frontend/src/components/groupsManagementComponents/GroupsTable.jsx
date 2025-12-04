import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteGroup, getGroups, getTeacherGroups } from "../../services/Groups.service"



export default function GroupsTable({ groups = [] }) {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);

  const user = sessionStorage.getItem("userData")
  const userParsed = JSON.parse(user);
  const { role, id } = userParsed



  const groupAddForm = () => {
    navigate("form")
  }

  const groupEditForm = () => {
    navigate("form", { state: { selectedRow } })
  }

  const fetchDataAsAdmin = async () => {
    try {
      const { data } = await getGroups();
      setTableData(data)
      console.log(tableData)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDataAsTeacher = async () => {
    try {
      const { data } = await getTeacherGroups(id);
      setTableData(data)
      console.log(tableData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(role=='admin' || role=='master'){
      fetchDataAsAdmin();
    }else if(role=='teacher' || role=='therapist'){
      fetchDataAsTeacher();
    }
  }, [])


  const handleDelete = () => {
    console.log("ELIMINANDO")
    if (selectedRow.id) {
      if (window.confirm("Quieres eliminar este registro?")) {
        const { id } = selectedRow;
        const result = deleteGroup(id);
        console.log(result)
      }
      fetchData();
    } else {
      return
    }
  }
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row space-x-8 p-4">
        <button className="bg-green-600 rounded-md p-1 hover:bg-green-800 disabled:bg-green-800 disabled:cursor-not-allowed disabled:hover:bg-green-800" onClick={groupAddForm} disabled={role !== "admin" && role !== "master"}>Agregar</button>
        <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800 disabled:bg-orange-800 disabled:cursor-not-allowed disabled:hover:bg-orange-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={groupEditForm}>Editar</button>
        <button className="bg-red-600 rounded-md p-1 hover:bg-red-800 disabled:bg-red-800 disabled:cursor-not-allowed disabled:hover:bg-red-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={handleDelete}>Eliminar</button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Descripción</th>
            <th className="py-2 px-4 border-b text-left">Programa educativo</th>
            <th className="py-2 px-4 border-b text-left">ID del profesor</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((group) => (
            <tr key={group.id} onClick={() => {
              console.log(selectedRow)
              setSelectedRow(group)
            }} className={`cursor-pointer hover:bg-blue-200 ${selectedRow?.id === group.id ? "bg-blue-200" : ""}`}>
              <td className="py-2 px-4 border-b">{group.id}</td>
              <td className="py-2 px-4 border-b">{group.name}</td>
              <td className="py-2 px-4 border-b">{group.description}</td>
              <td className="py-2 px-4 border-b">{group.program_name}</td>
              <td className="py-2 px-4 border-b">{group.teacher_name + " " + group.teacher_lastname}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}