import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {deleteProgram, getPrograms} from "../../services/Programs.service"



export default function ProgramsTable({groups=[]}){
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]) 
    const [selectedRow, setSelectedRow] = useState(null);

    const programAddForm = ()=>{
        navigate("form")
    }

    const programEditForm = ()=>{
        navigate("form", {state: {selectedRow}})
    }

    const fetchData = async ()=>{
        try{
          const data = await getPrograms();
          console.log(await getPrograms())
          setTableData(data)
          
        }catch(err){
          console.log(err)
        }
      }

    useEffect(()=>{
      fetchData();
    },[])


    const handleDelete = ()=>{
      console.log("ELIMINANDO")
        if(selectedRow.id){
          if(window.confirm("Quieres eliminar este registro?")){
            const {id} = selectedRow;
            const result = deleteProgram(id);
            console.log(result)
          }
          fetchData();
        }else{
            return
        }
    }
    return (
    <div className="overflow-x-auto">
        <div className="flex flex-row space-x-8 p-4">
            <button className="bg-green-600 rounded-md p-1 hover:bg-green-800" onClick={programAddForm}>Agregar</button>
            <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800 disabled:bg-orange-800 disabled:cursor-not-allowed disabled:hover:bg-orange-800" disabled={!selectedRow} onClick={programEditForm}>Editar</button>
            <button className="bg-red-600 rounded-md p-1 hover:bg-red-800 disabled:bg-red-800 disabled:cursor-not-allowed disabled:hover:bg-red-800" disabled={!selectedRow} onClick={handleDelete}>Eliminar</button>
        </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Descripción</th>
          </tr>
        </thead>

        <tbody>
          {tableData?.map((program) => (
            <tr key={program.id} onClick={() => {
              console.log(selectedRow)
              setSelectedRow(program)
            }} className={`cursor-pointer hover:bg-blue-200 ${selectedRow?.id === program.id ? "bg-blue-200" : ""}`}>
              <td className="py-2 px-4 border-b">{program.name}</td>
              <td className="py-2 px-4 border-b">{program.description}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}