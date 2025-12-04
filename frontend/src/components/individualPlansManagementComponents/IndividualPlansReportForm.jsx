import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {sendReport} from "../../services/IndividualPlan.service"
export default function IndividualPlansReportForm() {

    const location = useLocation();
    const navigate = useNavigate()
    const individualPlan = location.state?.selectedRow

    console.log(individualPlan)

    const [individualPlanReportForm, setIndividualPlanReportForm] = useState({
        individual_Plan_id: individualPlan.id,
        individual_plan: individualPlan.goal,
        teacher_name: individualPlan.teacher_name,
        teacher_lastname: individualPlan.teacher_lastname,
        teacher_id: individualPlan.teacher_id,
        progress: individualPlan.progress,
        observations: ""
    })

    console.log(individualPlanReportForm)

    const [plans, setPlans] = useState([])
    const [teachers, setTeachers] = useState([])

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/individualplans")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndividualPlanReportForm({
            ...individualPlanReportForm,
            [name]: value
        });
    }

    const handleSave = (e) => {
        e.preventDefault();

        const data = sendReport(individualPlanReportForm)

        console.log(data)

        setTimeout(() => {
            navigate("/dashboard/individualplans")
        }, 1000)
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear Reporte De Plan Individual</h2>

                <form className="space-y-4" onSubmit={handleSave}>

                    <div>
                        <label className="text-gray-600 font-medium">Plan</label>
                        <select
                            required
                            disabled
                            name="plan_id"
                            value={individualPlanReportForm.individual_Plan_id}
                            onChange={(e) => setIndividualPlanForm({ ...individualPlanReportForm, individual_Plan_id: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value={individualPlanReportForm.individual_Plan_id}>{individualPlanReportForm.individual_plan}</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Maestro</label>
                        <select
                            required
                            disabled
                            name="teacher_id"
                            value={individualPlanReportForm.teacher_id}
                            onChange={(e) => setIndividualPlanReportForm({ ...individualPlanReportForm, teacher_id: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value={individualPlanReportForm.teacher_id}>{individualPlanReportForm.teacher_name} {individualPlanReportForm.teacher_lastname} </option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={individualPlanReportForm.progress}
                            name="progress"
                            onChange={(e) => setIndividualPlanReportForm({ ...individualPlanReportForm, progress: e.target.value })}
                            className="w-full"
                        />
                        <p>Progreso: {individualPlanReportForm.progress}%</p>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Observacion</label>
                        <input
                            type="text"
                            placeholder="Progreso"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                            name="observations"
                            value={individualPlanReportForm.observations}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-blue-700 transition-all"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-red-700 transition-all"
                    >
                        Cancelar
                    </button>

                </form>

            </div>
        </div>
    );
}