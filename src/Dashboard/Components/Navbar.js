import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, sidebarVisible, setSidebarVisible, username }) => 
{
  const navigate=useNavigate()
  const logout = () => 
  {
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" onClick={() => sidebarVisible && setSidebarVisible(false)}>
      <div className="container-fluid">
        {/* Navbar Start */}
        <div className="d-flex align-items-center">
          <button onClick={toggleSidebar} className="btn p-2 text-light">
            {sidebarVisible ? <IoClose className="fs-4" /> : <IoMenu className="fs-4" />}
          </button>
        </div>

        {/* Navbar End */}
        <div className="d-flex align-items-center ms-auto">
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-light bg-secondary d-flex align-items-center rounded-3 px-3 py-2 active profile-link": "text-light  d-flex align-items-center rounded-3 px-3 py-2 profile-link"}>
            <CiUser className="fs-5 me-2" /> {username}
          </NavLink>
          <button onClick={logout} className="btn text-light d-flex align-items-center rounded-3 px-3">
            <IoIosLogOut className="fs-5 me-2" /> Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
