export default function ProgressCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">PEI activos: 3</div>
            <div className="bg-white p-4 rounded-xl shadow">Reportes nuevos: 1</div>
            <div className="bg-white p-4 rounded-xl shadow">Progreso general: 68%</div>
            <div className="bg-white p-4 rounded-xl shadow">Última actualización: hace 2 días</div>
        </div>
    );
}