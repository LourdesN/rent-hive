import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

function Navbar() 
{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Navbar Brand */}
                <NavLink className="navbar-brand" to="#">Rent Hive</NavLink>

                {/* Navbar Toggler for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#about">Home</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#services">Our services</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#properties">Properties</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="#contact">Contact Us</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Get started</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
