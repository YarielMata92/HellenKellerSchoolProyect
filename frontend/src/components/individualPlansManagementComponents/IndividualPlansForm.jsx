import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { createIndividualPlan, updateIndividualPlan, deleteIndividualPlan } from "../../services/IndividualPlan.service";
import { getUserTeacher } from "../../services/Users.service";
import { getStudents } from "../../services/Students.service";

export default function IndividualPlansForm() {


    const [progress, setProgress] = useState(50);
    const navigate = useNavigate();
    const location = useLocation();
    const individualPlan = location.state?.selectedRow
    const [usersTeachers, setUsersTeachers] = useState([])
    const [students, setStudents] = useState([])

    const [individualPlanForm, setIndividualPlanForm] = useState({
        id: individualPlan?.id || 0,
        teacher_id: individualPlan?.teacher_id || "",
        teacher_name: individualPlan?.teacher_name || "",
        teacher_lastname: individualPlan?.teacher_lastname || "",
        student_id: individualPlan?.student_id || "",
        student_name: individualPlan?.student_name || "",
        student_lastname: individualPlan?.student_lastname,
        goal: individualPlan?.goal || "",
        progress: individualPlan?.progress || 0
    })

    useEffect(() => {
        const getAllUsersTeachers = async () => {
            try {
                const teachers = await getUserTeacher()
                setUsersTeachers(teachers)
            } catch (err) {
                console.log(err)
            }

        }
        const getAllStudents = async () => {
            try {
                const { data } = await getStudents();
                setStudents(data)
            } catch (err) {
                console.log(data)
            }
        }
        getAllUsersTeachers()
        getAllStudents()
    }, [])

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/individualplans")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIndividualPlanForm({
            ...individualPlanForm,
            [name]: value
        });
    }

    const handleSave = async (e) => {
        e.preventDefault();

        console.log("Agregar")
        const res = await createIndividualPlan(individualPlanForm)
        console.log(res)
        alert("Actualizado correctamente")

        setTimeout(() => {
            navigate("/dashboard/individualplans")
        }, 1000)

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                {individualPlan ? (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Editar Plan Individual</h2>
                ) : (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear Plan Individual</h2>
                )}

                <form className="space-y-4" onSubmit={handleSave}>

                    <div>
                        <label className="text-gray-600 font-medium">Estudiante</label>
                        <select
                            required
                            name="teacher_id"
                            value={individualPlanForm.student_id}
                            onChange={(e) => setIndividualPlanForm({ ...individualPlanForm, student_id: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="">Seleccione un Estudiante</option>

                            {students.map(st => (
                                <option key={st.id} value={st.id}>
                                    {st.name} {st.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Maestro</label>
                        <select
                            required
                            name="teacher_id"
                            value={individualPlanForm.teacher_id}
                            onChange={(e) => setIndividualPlanForm({ ...individualPlanForm, teacher_id: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="">Seleccione un profesor</option>

                            {usersTeachers.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.name} {t.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Meta</label>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                            name="goal"
                            value={individualPlanForm.goal}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={individualPlanForm.progress}
                            name="progress"
                            onChange={(e) => setIndividualPlanForm({ ...individualPlanForm, progress: e.target.value })}
                            className="w-full"
                        />
                        <p>Progreso: {individualPlanForm.progress}%</p>
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