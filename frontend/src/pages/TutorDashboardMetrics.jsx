import HeaderStudentInfo from "../components/studentsDashboardComponents/HeaderStudentInfo"
import ProgressCards from "../components/studentsDashboardComponents/ProgressCards"
import ProgressChart from "../components/studentsDashboardComponents/ProgressChart"
import RecentReports from "../components/studentsDashboardComponents/RecentReports"
import AlertsPanel from "../components/studentsDashboardComponents/AlertsPanel"
import TherapyList from "../components/studentsDashboardComponents/TherapyList"

export default function TutorDashboardMetrics() {
    return (
        <div className="min-h-screen p-6 bg-[var(--primary-2,#FBEBEB)] text-gray-900" style={{ fontFamily: '"Open Sans", system-ui, -apple-system, sans-serif' }}>
            <header className="max-w-6xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-md flex items-center justify-center bg-[#1791cd] text-white font-bold" aria-hidden>
                        HK
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold" style={{ fontFamily: '"Playfair Display", serif' }}>Centro Hellen Keller</h1>
                        <p className="text-sm">Panel del encargado — Progreso del estudiante</p>
                    </div>
                </div>
            </header>
            <HeaderStudentInfo />
            <ProgressCards />
            <ProgressChart />
            <TherapyList />
            <RecentReports />
            <AlertsPanel />
        </div>
    );
}