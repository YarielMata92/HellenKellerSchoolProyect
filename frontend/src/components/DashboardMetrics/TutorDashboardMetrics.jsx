import { useEffect, useState } from "react";
import axios from "axios";

export default function TutorDashboardMetrics() {
    const [data, setData] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("userData"));
    const {id} = user
    console.log(typeof(id))

    useEffect(() => {
        const fetchData = async () => {
            console.log(`http://localhost:4000/api/dashboard/metrics/tutor/${id}`)
            const res = await axios.get(`http://localhost:4000/dashboard/metrics/tutor/${id}`);
            setData(res.data.data);
        };
        fetchData();
    }, []);

    if (data.length === 0) return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg text-center text-gray-700 max-w-md w-full">
                <p className="text-xl md:text-2xl font-semibold mb-2">
                    No hay estudiantes asociados
                </p>
                <p className="text-sm md:text-base">
                    Cuando se asignen estudiantes a tu usuario, aparecerán aquí.
                </p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {data.map((item) => (
                <div key={item.student.id}>

                    {/* HEADER */}
                    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
                        <h1 className="text-2xl font-bold">
                            {item.student.name} {item.student.lastname}
                        </h1>
                        <p>Grupo: {item.student.group_name || "Sin grupo"}</p>
                        <p>Edad: {calcAge(item.student.birthdate)} años</p>
                    </div>

                    {/* PROGRESS CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow">PEI activos: {item.peiCount}</div>
                        <div className="bg-white p-4 rounded-xl shadow">Reportes nuevos: {item.lastReport ? 1 : 0}</div>
                        <div className="bg-white p-4 rounded-xl shadow">Progreso general: {item.generalProgress}%</div>
                        <div className="bg-white p-4 rounded-xl shadow">
                            Última actualización:{" "}
                            {item.lastReport ? timeSince(item.lastReport.created_at) : "Sin reportes"}
                        </div>
                    </div>

                    {/* TERAPIAS ACTIVAS */}
                    <div className="bg-white p-4 rounded-xl shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Terapias activas</h2>

                        {item.therapies.map((t) => (
                            <div key={t.id} className="p-3 bg-gray-50 rounded mb-3">
                                <h3 className="font-semibold">{t.goal}</h3>
                                <p>Progreso: {t.progress}%</p>
                                <p>Último reporte: {t.last_update ? formatDate(t.last_update) : "N/A"}</p>
                            </div>
                        ))}
                    </div>

                    {/* REPORTES */}
                    <div className="bg-white p-4 rounded-xl shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Reporte más reciente</h2>

                        {item.lastReport ? (
                            <div className="border-l-4 border-blue-600 pl-3 mb-3">
                                <p className="text-sm text-gray-600">
                                    {formatDate(item.lastReport.created_at)}
                                </p>
                                <p>{item.lastReport.observations}</p>
                            </div>
                        ) : (
                            <p>No hay reportes recientes.</p>
                        )}
                    </div>

                    {/* ALERTAS */}
                    <div className="bg-white p-4 rounded-xl shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Alertas</h2>
                        <ul className="list-disc pl-5">
                            {item.generalProgress < 40 && (
                                <li>⚠️ El progreso general es bajo</li>
                            )}
                            {item.peiCount === "0" && <li>📌 No tiene PEIs activos</li>}
                            {item.lastReport == null && <li>🔔 No hay reportes recientes</li>}
                        </ul>
                    </div>

                </div>
            ))}
        </div>
    );
}

// --- HELPERS ---
function calcAge(birthdate) {
    return Math.floor((new Date() - new Date(birthdate)) / 31557600000);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function timeSince(date) {
    const diff = Date.now() - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? "Hoy" : `Hace ${days} días`;
}