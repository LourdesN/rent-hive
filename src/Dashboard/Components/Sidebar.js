import { FaHome, FaFileInvoiceDollar, FaHouseUser, FaBuilding } from "react-icons/fa"
import { BiBuildingHouse } from "react-icons/bi"
import { IoCashOutline } from "react-icons/io5"
import { MdOutlineRealEstateAgent } from "react-icons/md"

import { NavLink } from "react-router-dom"

import Logo from "../../Assets/Images/Logo.jpg"

const Sidebar = ({isVisible, role}) => 
{
    const links = role === "Owner"
    ? 
        [
            { to: "/dashboard/properties", icon: <BiBuildingHouse className="me-2"/>, label: "My Properties" },
            { to: "/dashboard/payments", icon: <IoCashOutline className="me-2"/>, label: "Payments" },
        ]
    : 
        role === "Tenant"
        ?
            [
                { to: "/dashboard/available-properties", icon: <BiBuildingHouse className="me-2"/>, label: "Available Properties" },
                { to: "/dashboard/invoices", icon: <FaFileInvoiceDollar className="me-2"/>, label: "Invoices" },
                { to: "/dashboard/leases", icon: <MdOutlineRealEstateAgent className="me-2"/>, label: "Leases" },
            ]
        :
            role === "Admin"
            ?
                [
                    { to: "/dashboard/owners", icon: <BiBuildingHouse className="me-2"/>, label: "Home owners" },
                    { to: "/dashboard/tenants", icon: <FaHouseUser className="me-2"/>, label: "Tenants" },
                    { to: "/dashboard/all-properties", icon: <FaBuilding className="me-2"/>, label: "Properties" },
                ]
            :
                null
    return (
        isVisible && (
            <aside  className= {`bg-dark text-white vh-100 fixed-top start-0 ${isVisible ? "translate-x-0" : "-translate-x-100"} d-flex flex-column`} style={{ width: "12rem", zIndex: "1050", marginTop: "5rem", transition: "transform 0.3s ease-in-out"}}>
                <img src={Logo} alt="Rent Hive" className="bg-light w-100" style={{height: "6rem"}}/>
                <ul className="nav flex-column">
                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "li active text-light" : "li text-light"}>
                        <FaHome className="me-2" />  Dashboard
                    </NavLink>
                    {
                        links.map((link, index) => 
                        (
                            <NavLink key={index} to={link.to} end className={({ isActive }) => (isActive ? "li active text-light" : "li text-light")}>{link.icon} {link.label}</NavLink>
                        ))
                    }                    
                </ul>
            </aside>
        )
    )
}
export default Sidebar