import { NavLink } from "react-router-dom"

const Invoices = () =>
{
    return(
        <>
            <h2>Invoices page</h2>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link">All invoices</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link">Pending invoices</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link">Paid invoices</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link">Overdue invoices</NavLink>
                </li>
            </ul>
        </>
    )
}

export default Invoices