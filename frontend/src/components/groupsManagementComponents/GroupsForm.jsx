import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveGroup, updateGroup, deleteGroup } from "../../services/Groups.service";
import { getUserTeacher } from "../../services/Users.service";
import { getEducationalPrograms } from "../../services/educationalPrograms.service";

export default function GroupsForm() {


    const navigate = useNavigate();
    const location = useLocation();
    const group = location.state?.selectedRow
    const [usersTeachers, setUsersTeachers] = useState([])
    const [educationalPrograms, setEducationalPrograms] = useState([])
    console.log(group)

    const [groupForm, setGroupFrom] = useState({
        id: group?.id || 0,
        name: group?.name || "",
        description: group?.description || "",
        educationalProgram: group?.program_id || 0,
        teacher: group?.teacher_id || 0
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
        const getAllEducationalPrograms = async ()=>{
            try{
                const programs = await getEducationalPrograms();
                setEducationalPrograms(programs)
            }catch(err){
                console.log(err)
            }
        }
        getAllUsersTeachers()
        getAllEducationalPrograms()
    }, [])

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/groups")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroupFrom({
            ...groupForm,
            [name]: value
        });
    }

    const handleSave = (e) => {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            alert(e.target.reportValidity)
            return
        }
        if (groupForm.id > 0) {
            console.log("Actualizar")
            const res = updateGroup(groupForm)
            console.log(res)
            alert("Actualizado correctamente")
        } else {
            console.log("Agregar")
            const res = saveGroup(groupForm)
            console.log(res)
            alert("Actualizado correctamente")
        }
        
        setTimeout(()=>{
            navigate("/dashboard/groups")
        },1000)
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                {group ? (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Editar Grupo</h2>
                ) : (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear nuevo grupo</h2>
                )}

                <form className="space-y-4" onSubmit={handleSave}>

                    <div>
                        <label className="text-gray-600 font-medium">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                            name="name"
                            value={groupForm.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Descripcion</label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            name="description"
                            value={groupForm.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Programa Educativo</label>
                        <select
                            required
                            name="educationalProgram"
                            value={groupForm.educationalProgram}
                            onChange={(e) => setGroupFrom({ ...groupForm, educationalProgram: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="">Seleccione un programa</option>

                            {educationalPrograms.map(ed => (
                                <option key={ed.id} value={ed.id}>
                                    {ed.name} {ed.description}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Maestro</label>
                        <select
                            required
                            name="teacher"
                            value={groupForm.teacher}
                            onChange={(e) => setGroupFrom({ ...groupForm, teacher: e.target.value })}
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