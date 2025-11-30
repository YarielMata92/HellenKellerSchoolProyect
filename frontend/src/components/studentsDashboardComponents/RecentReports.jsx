export default function RecentReports() {
    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Reportes recientes</h2>


            <div className="border-l-4 border-green-600 pl-3 mb-3">
                <p className="text-sm text-gray-600">Ayer – Terapeuta Ana López</p>
                <p>Juan completó el ejercicio de cortar frutas con supervisión mínima.</p>
            </div>


            <div className="border-l-4 border-blue-600 pl-3 mb-3">
                <p className="text-sm text-gray-600">15/11 – Docente María Gómez</p>
                <p>Mejora en la organización del material escolar.</p>
            </div>
        </div>
    );
}