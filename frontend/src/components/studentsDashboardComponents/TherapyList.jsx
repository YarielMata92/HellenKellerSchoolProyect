export default function TherapyList() {
    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Terapias activas</h2>


            <div className="p-3 bg-gray-50 rounded mb-3">
                <h3 className="font-semibold">Cocina Adaptada</h3>
                <p>Progreso: 55%</p>
                <p>Último reporte: 20/11/2025</p>
            </div>


            <div className="p-3 bg-gray-50 rounded mb-3">
                <h3 className="font-semibold">Autocuidado Personal</h3>
                <p>Progreso: 72%</p>
                <p>Último reporte: 14/11/2025</p>
            </div>
        </div>
    );
}