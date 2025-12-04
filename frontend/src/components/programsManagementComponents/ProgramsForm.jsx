import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { saveProgram, updateProgram } from "../../services/Programs.service";

export default function ProgramsForm() {


    const navigate = useNavigate();
    const location = useLocation();
    const program = location.state?.selectedRow


    const [programForm, setProgramFrom] = useState({
        id: program?.id || 0,
        name: program?.name || "",
        description: program?.description || ""
    })


    const handleCancel = (e) => {
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/programs")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramFrom({
            ...programForm,
            [name]: value
        });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let actionSucced = false;

        if (!e.target.checkValidity()) {
            e.target.reportValidity
            return;
        }

        console.log(programForm.id)
        if (programForm.id > 0) {
            const {data} = await updateProgram(programForm)
            console.log(data)
            if (data.id > 0) {
                actionSucced = true
            }
        } else {
            console.log("Agregar")
            const { data } = await saveProgram(programForm)
            console.log(data)
            if (data.id > 0) {
                actionSucced = true
            }
        }

        if (actionSucced==true) {
            alert("Actualizado correctamente")

            setTimeout(() => {
                navigate("/dashboard/programs")
            }, 1000)
        } else {
            alert("Error al guardar")
        }

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                {program ? (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Editar Programa educativo</h2>
                ) : (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear nuevo Programa educativo</h2>
                )}

                <form className="space-y-4" onSubmit={handleSave}>

                    <div>
                        <label className="text-gray-600 font-medium">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre Del Programa"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                            name="name"
                            value={programForm.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Descripcion</label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            name="description"
                            value={programForm.description}
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