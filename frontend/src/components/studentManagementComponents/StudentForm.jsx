import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserTutor } from "../../services/Users.service";
import { saveStudent, updateStudent } from "../../services/Students.service"
import { getEducationalPrograms } from "../../services/educationalPrograms.service";
export default function StudentForm() {
  const navigate = useNavigate();

  const location = useLocation();
  const student = location.state?.selectedRow

  const [usersTutor, setUsersTutor] = useState([])
  const [educationalPrograms, setEducationalPrograms] = useState([])


  const [studentForm, setStudentForm] = useState({
    id: student?.id || -1,
    dni: student?.dni || "",
    name: student?.name || "",
    lastname: student?.lastname || "",
    second_lastname: student?.second_lastname || "",
    birthdate: student?.birthdate || "",
    disability: student?.disability || "",
    tutor: student?.tutor || "",
    tutor_id: student?.tutor_id || "",
    educational_program: student?.educational_program || "",
    educational_program_id: student?.educational_program_id || ""
  })

  const handleSave = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      alert(e.target.reportValidity)
      return
    }

    if (studentForm.id > 0) {
      console.log("Actualizar")
      const res = updateStudent(studentForm)
      console.log(res)
      alert("Actualizado correctamente")
    } else {
      console.log("Agregar")
      const res = saveStudent(studentForm)
      console.log(res)
      alert("Actualizado correctamente")
    }

    setTimeout(() => {
      navigate("/dashboard/students")
    }, 1000)
    
  }

  const handleCancel = (e) => {
    e.preventDefault();
    console.log("handleCancel")
    navigate("/dashboard/students")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentForm({
      ...studentForm,
      [name]: value
    });
  }

  useEffect(() => {
    const getAllUsersTutor = async () => {
      try {
        const tutors = await getUserTutor()
        setUsersTutor(tutors)
      } catch (err) {
        console.log(err)
      }

    }
    const getAllEducationalPrograms = async () => {
      try {
        const programs = await getEducationalPrograms();
        setEducationalPrograms(programs)
      } catch (err) {
        console.log(err)
      }
    }
    getAllUsersTutor()
    getAllEducationalPrograms()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">

        {student ? (
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Editar Estudiante</h2>
        ) : (
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Crear Nuevo Estudiante</h2>
        )}

        <form className="space-y-4" onSubmit={handleSave}>

          {/* Name */}
          <div>
            <label className="text-gray-600 font-medium">Cedula</label>
            <input
              name="dni"
              value={studentForm.dni}
              onChange={handleChange}
              type="text"
              placeholder="dni"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-600 font-medium">Nombre</label>
            <input
              name="name"
              value={studentForm.name}
              onChange={handleChange}
              type="text"
              placeholder="Nombre"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {/* lastname */}
          <div>
            <label className="text-gray-600 font-medium">Apellido</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="lastname"
              value={studentForm.lastname}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>

          {/* lastname */}
          <div>
            <label className="text-gray-600 font-medium">Segundo Apellido</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="second_lastname"
              value={studentForm.second_lastname}
              onChange={handleChange}
              placeholder="Segundo apellido"
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="text-gray-600 font-medium">Fecha de nacimiento</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="birthdate"
              value={studentForm.birthdate}
              onChange={handleChange}
            />
          </div>

          {/* Disability */}
          <div>
            <label className="text-gray-600 font-medium">Discapacidad</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="disability"
              value={studentForm.disability}
              onChange={handleChange}
              placeholder="Discapacidad"
            />
          </div>

          {/* Tutor ID */}
          <div>
            <label className="text-gray-600 font-medium">Programa Educativo</label>
            <select
              required
              name="educational_Program_id"
              value={studentForm.educational_program_id}
              onChange={(e) => setStudentForm({ ...studentForm, educational_program_id: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Seleccione un programa</option>

              {educationalPrograms.map(ed => (
                <option key={ed.id} value={ed.id}>
                  {ed.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Tutor</label>
            <select
              required
              name="tutor_id"
              value={studentForm.tutor_id}
              onChange={(e) => setStudentForm({ ...studentForm, tutor_id: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Seleccione un Tutor</option>

              {usersTutor.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.lastname}
                </option>
              ))}
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