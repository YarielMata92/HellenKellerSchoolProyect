import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllRoles } from "../../services/roles.service";
import { saveUser, updateUser } from "../../services/Users.service";

export default function UsersForm() {


    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.selectedRow

    const [userForm, setUserForm] = useState({
        id: user?.id || -1,
        name: user?.name || "",
        lastname: user?.lastname || "",
        dni: user?.dni || "",
        email: user?.email || "",
        role: user?.role || "",
        role_id: user?.role_id || ""
    })

    const [roles, setRoles] = useState([]);

    const getUserRoles = async () => {
        const { data } = await getAllRoles();
        console.log(await getAllRoles())
        setRoles(data)
    }

    useEffect(() => {
        getUserRoles();
        console.log(roles)
    }, [])

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/users")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        let actionSucced = false;

        if (!e.target.checkValidity()) {
            alert(e.target.reportValidity)
            return
        }
        if (userForm.id > 0) {
            const res = await updateUser(userForm)
            const { data } = res;
            if (data.id > 0) {
                actionSucced = true
            }

        } else {
            console.log("Agregar")
            const res = await saveUser(userForm)
            const { data } = res;
            if (data.id > 0) {
                actionSucced = true
            }

        }

        if (actionSucced) {
            alert("Actualizado correctamente")

            setTimeout(() => {
                navigate("/dashboard/users")
            }, 1000)
        }else{
            alert("Error al guardar")
        }


    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

                {user ? (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Editar Usuario</h2>
                ) : (
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear nuevo Usuario</h2>
                )}

                <form className="space-y-4" onSubmit={handleSave}>

                    <div>
                        <label className="text-gray-600 font-medium">DNI</label>
                        <input
                            type="text"
                            placeholder="DNI"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            required
                            name="dni"
                            value={userForm.dni}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Nombre</label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            name="name"
                            placeholder="Nombre"
                            value={userForm.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Apellido</label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            name="lastname"
                            placeholder="Apellido"
                            value={userForm.lastname}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            name="email"
                            placeholder="email"
                            value={userForm.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-medium">Rol</label>
                        <select
                            required
                            name="role_id"
                            value={userForm.role_id}
                            onChange={(e) => setUserForm({ ...userForm, role_id: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        >
                            <option value="">Seleccione un rol</option>

                            {roles.map(rol => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.role}
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