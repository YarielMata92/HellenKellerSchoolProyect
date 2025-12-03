import UsersTable from "../components/usersManagementComponents/UsersTable";
export default function UsersManagement() {
    return (
        <div className="min-h-screen p-6 text-gray-900" style={{ fontFamily: '"Open Sans", system-ui, -apple-system, sans-serif' }}>
            <header className="max-w-6xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-md flex items-center justify-center bg-[#1791cd] text-white font-bold" aria-hidden>
                        HK
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold" style={{ fontFamily: '"Playfair Display", serif' }}>Gestion de Usuarios</h1>
                        <p className="text-sm">Panel del encargado — Nombre del encargado</p>
                    </div>
                </div>
            </header>
            <UsersTable />
        </div>
    );
}