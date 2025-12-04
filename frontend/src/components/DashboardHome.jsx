import AdminDashboardMetrics from "./DashboardMetrics/AdminDashBoardMetrics"
import TutorDashboardMetrics from "./DashboardMetrics/TutorDashboardMetrics";

export default function DashboardHome(){
    const user = sessionStorage.getItem("userData")
    const userParsed = JSON.parse(user);
    const {role} = userParsed
    console.log(role)
    return(
       <div>
            {role === "admin" || role === "master" ? <AdminDashboardMetrics /> : <TutorDashboardMetrics />}
        </div>
    );
}