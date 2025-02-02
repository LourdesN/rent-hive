import { NavLink } from "react-router-dom";

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
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/properties">Properties</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/list-property">List Property</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="./Footer.js">Contact Us</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Get started</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/sign-up">Sign Up</NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
