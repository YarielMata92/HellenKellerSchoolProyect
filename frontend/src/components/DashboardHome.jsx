import AdminDashboardMetrics from "./DashboardMetrics/AdminDashBoardMetrics"
import TutorDashboardMetrics from "./DashboardMetrics/TutorDashboardMetrics";

export default function DashboardHome() {
    const user = sessionStorage.getItem("userData")
    const userParsed = JSON.parse(user);
    const { role } = userParsed
    console.log(role)
    return (
        <div>
            {role === "admin" || role === "master" ? (
                <AdminDashboardMetrics />
            ) : role === "tutor" ? (
                <TutorDashboardMetrics />
            ) : (
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg text-center text-gray-700 max-w-md w-full">
                        <p className="text-xl md:text-2xl font-semibold mb-2">
                            Este panel está restringido.</p>
                        <p className="text-sm md:text-base">
                            Solo los administradores pueden acceder al panel administrativo.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}