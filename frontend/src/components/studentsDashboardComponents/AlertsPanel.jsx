export default function AlertsPanel() {
    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Alertas</h2>
            <ul className="list-disc pl-5">
                <li>🔔 Nuevo reporte disponible en Autocuidado</li>
                <li>⚠️ El PEI necesita actualización dentro de 7 días</li>
                <li>📩 Mensaje del docente</li>
            </ul>
        </div>
    );
}