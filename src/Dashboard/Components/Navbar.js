import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../Context/Login Context"

import Loader from "../../Assets/Components/Loader"

const Navbar = ({ toggleSidebar, sidebarVisible, setSidebarVisible, username }) => 
{
  const { logOut, loading } = useLogin()
  
  return (
    <>
      {loading && <Loader/>}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" onClick={() => sidebarVisible && setSidebarVisible(false)}>
        <div className="container-fluid">
          {/* Navbar Start */}
          <div className="d-flex align-items-center">
            <button onClick={toggleSidebar} className="btn p-2 text-light">
              {sidebarVisible ? <IoClose className="fs-4" /> : <IoMenu className="fs-4" />}
            </button>
          </div>

          {/* Navbar End */}
          <div className="d-flex align-items-center ms-auto">
            <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-light bg-secondary d-flex align-items-center rounded-2 px-1 py-1 active profile-link": "text-light  d-flex align-items-center rounded-2 px-1 py-1 profile-link"}>
              <CiUser className="fs-6 me-2" /> {username}
            </NavLink>
            <button onClick={()=> logOut()} className="btn text-light d-flex align-items-center rounded-3 px-3">
              <IoIosLogOut className="fs-5 me-1" /> Sign Out
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
