import { useNavigate } from "react-router-dom";
export default function StudentForm(){
    const navigate = useNavigate();

    const handleCancel = (e)=>{
        e.preventDefault();
        console.log("handleCancel")
        navigate("/dashboard/students")
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Registrar Estudiante
        </h2>

        <form className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-gray-600 font-medium">Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="text-gray-600 font-medium">Fecha de nacimiento</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Disability */}
          <div>
            <label className="text-gray-600 font-medium">Discapacidad</label>
            <input
              type="text"
              placeholder="Tipo de discapacidad"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Tutor ID */}
          <div>
            <label className="text-gray-600 font-medium">ID del Tutor</label>
            <input
              type="number"
              placeholder="Ej: 12"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Educational Program */}
          <div>
            <label className="text-gray-600 font-medium">Programa Educativo</label>
            <select
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Seleccione un programa</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Preparatoria">Preparatoria</option>
              <option value="Universidad">Universidad</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-blue-700 transition-all"
          >
            Guardar estudiante
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