import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/Users.service";



export default function UsersTable() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);

  const userAddForm = () => {
    navigate("form")
  }

  const userEditForm = () => {
    navigate("form", { state: { selectedRow } })
  }

  const fetchData = async () => {
    try {
      console.log(getAllUsers())
      const data = await getAllUsers();
      setTableData(data)
      console.log(tableData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleDelete = () => {
    console.log("ELIMINANDO")
    if (selectedRow.id) {
      if (window.confirm("Quieres eliminar este registro?")) {
        const { id } = selectedRow;
        //const result = deleteGroup(id);
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
        <button className="bg-green-600 rounded-md p-1 hover:bg-green-800" onClick={userAddForm}>Agregar</button>
        <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800 disabled:bg-orange-800 disabled:cursor-not-allowed disabled:hover:bg-orange-800" disabled={!selectedRow} onClick={userEditForm}>Editar</button>
        <button className="bg-red-600 rounded-md p-1 hover:bg-red-800 disabled:bg-red-800 disabled:cursor-not-allowed disabled:hover:bg-red-800" disabled={!selectedRow} onClick={handleDelete}>Eliminar</button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">DNI</th>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Apellido</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {tableData?.map((user) => (
            <tr
              key={user.id}
              onClick={() => setSelectedRow(user)}
              className={`cursor-pointer hover:bg-blue-200 ${selectedRow?.id === user.id ? "bg-blue-200" : ""
                }`}
            >
              <td>{user.dni}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}