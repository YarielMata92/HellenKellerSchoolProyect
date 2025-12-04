import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {deleteIndividualPlan, getIndividualPlan} from "../../services/IndividualPlan.service"



export default function IndividualPlansTable(){
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]) 
    const [selectedRow, setSelectedRow] = useState(null);

    const user = sessionStorage.getItem("userData")
    const userParsed = JSON.parse(user);
    const {role} = userParsed

    const individualPlanAddForm = ()=>{
        navigate("form")
    }

    const individualPlanEditForm = ()=>{
        navigate("form", {state: {selectedRow}})
    }

    const fetchData = async ()=>{
        try{
          const {data} = await getIndividualPlan();
          setTableData(data)
          console.log(tableData)
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
            const result = deleteIndividualPlan(id);
            console.log(result)
          }
          fetchData();
        }else{
            return
        }
    }

    const moveToReport = ()=>{
      navigate("form/report", {state: {selectedRow}})
    }
    return (
    <div className="overflow-x-auto">
        <div className="flex flex-row space-x-8 p-4">
            <button className="bg-green-600 rounded-md p-1 hover:bg-green-800 disabled:bg-green-800 disabled:cursor-not-allowed disabled:hover:bg-green-800" onClick={individualPlanAddForm} disabled={role !== "admin" && role !== "master"}>Agregar</button>
            <button className="bg-orange-600 rounded-md p-1 hover:bg-orange-800 disabled:bg-orange-800 disabled:cursor-not-allowed disabled:hover:bg-orange-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={individualPlanEditForm}>Editar</button>
            <button className="bg-red-600 rounded-md p-1 hover:bg-red-800 disabled:bg-red-800 disabled:cursor-not-allowed disabled:hover:bg-red-800" disabled={!selectedRow || (role !== "admin" && role !== "master")} onClick={handleDelete}>Eliminar</button>
            <button className="bg-blue-600 rounded-md p-1 hover:bg-blue-800 disabled:bg-blue-800 disabled:cursor-not-allowed disabled:hover:bg-blue-800 " disabled={!selectedRow || (role !== "teacher" && role !== "therapist")} onClick={moveToReport}>Hacer un reporte</button>
        </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left">Student</th>
            <th className="py-2 px-4 border-b text-left">Teacher</th>
            <th className="py-2 px-4 border-b text-left">Goal</th>
            <th className="py-2 px-4 border-b text-left">Progress</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((ip) => (
            <tr key={ip.id} onClick={() => {
              console.log(selectedRow)
              setSelectedRow(ip)
            }} className={`cursor-pointer hover:bg-blue-200 ${selectedRow?.id === ip.id ? "bg-blue-200" : ""}`}>
              <td className="py-2 px-4 border-b">{ip.student_name} {ip.student_lastname}</td>
              <td className="py-2 px-4 border-b">{ip.teacher_name} {ip.teacher_lastname}</td>
              <td className="py-2 px-4 border-b">{ip.goal}</td>
              <td className="py-2 px-4 border-b">{ip.progress}%</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}