import { FaHome,FaUsers } from "react-icons/fa"
import { CiCalendarDate } from "react-icons/ci"
import { TbChecklist } from "react-icons/tb"
import { NavLink } from "react-router-dom"

import Logo from "../../Assets/Images/Logo.jpg"
const Sidebar = ({isVisible}) => 
{
    return (
        isVisible && (
            <aside  className={`bg-dark text-white vh-100 fixed-top start-0 ${isVisible ? "translate-x-0" : "-translate-x-100"} d-flex flex-column`} style={{ width: "16rem", zIndex: "1050", top: "5rem", transition: "transform 0.3s ease-in-out"}}>
                <img src={Logo} alt="Mobikey Truck & Bus Limited" className="bg-light w-100" style={{height: "10rem"}}/>
                <ul className="nav flex-column">
                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "li active text-light" : "li text-light"}>
                        <FaHome className="me-2" />  Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/approved-requests" className={({ isActive }) => isActive ? "li active text-light" : "li text-light"}>
                        <TbChecklist className="me-2" /> Approved Requests
                    </NavLink>
                </ul>
            </aside>
        )
    );
}
 
export default Sidebar;