import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
export default function AdminDashboardMetrics(){
    const [metrics, setMetrics] = useState(null);


    useEffect(() => {
    axios.get("http://localhost:4000/dashboard/metrics/admin").then(res => {
      setMetrics(res.data);
    });
  }, []);

  console.log(metrics)

  if (!metrics)
    return <p className="p-4 text-gray-600">Cargando métricas...</p>;

  const { totals, groupsPerProgram, studentsPerGroup, progressPerProgram } = metrics;

  return (
    <div className="p-4 space-y-10">
        <h2>HOLAAA</h2>

      {/* ---------- MÉTRICAS (CARDS) ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 shadow rounded-lg border">
          <p className="text-gray-500 text-sm">Programas</p>
          <h2 className="text-3xl font-bold">{totals.programs}</h2>
        </div>
        <div className="bg-white p-5 shadow rounded-lg border">
          <p className="text-gray-500 text-sm">Grupos</p>
          <h2 className="text-3xl font-bold">{totals.groups}</h2>
        </div>
        <div className="bg-white p-5 shadow rounded-lg border">
          <p className="text-gray-500 text-sm">Estudiantes</p>
          <h2 className="text-3xl font-bold">{totals.students}</h2>
        </div>
        <div className="bg-white p-5 shadow rounded-lg border">
          <p className="text-gray-500 text-sm">Maestros</p>
          <h2 className="text-3xl font-bold">{totals.teachers}</h2>
        </div>
      </div>

      {/* ---------- GRUPOS POR PROGRAMA ---------- */}
      <div className="bg-white p-4 shadow rounded-lg border">
        <h3 className="text-xl font-semibold mb-3">Grupos por Programa</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupsPerProgram}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="program" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="groups" fill="#1791cd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- ESTUDIANTES POR GRUPO ---------- */}
      <div className="bg-white p-4 shadow rounded-lg border">
        <h3 className="text-xl font-semibold mb-3">Estudiantes por Grupo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentsPerGroup}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#025937" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- PROGRESO PROMEDIO POR PROGRAMA ---------- */}
      <div className="bg-white p-4 shadow rounded-lg border">
        <h3 className="text-xl font-semibold mb-3">Progreso promedio por Programa</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressPerProgram}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="program_name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="avg_progress" fill="#BB1515" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- TABLA (ULTIMOS REPORTES) ---------- */}
      <div className="bg-white p-4 shadow rounded-lg border">
        <h3 className="text-xl font-semibold mb-3">Últimos Reportes</h3>

        {/* Si quieres obtener reportes reales, hago un endpoint aparte.
            Aquí solo dejo un placeholder para el diseño */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Plan</th>
              <th className="border p-2">Progreso</th>
              <th className="border p-2">Maestro</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Plan #1</td>
              <td className="border p-2">80%</td>
              <td className="border p-2">Pedro López</td>
              <td className="border p-2">2025-01-01</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
    

}