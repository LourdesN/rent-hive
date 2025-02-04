import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

import Loader from "../../../Assets/Components/Loader"

const Invoices = () => 
{
    const [invoices, setInvoices]=useState([])
    const [invoiceFilter, setFilter] = useState("All")
    const [loading, setLoading] = useState(false)
    const filters = ["All", "Pending", "Paid", "Overdue"]

    const navigate = useNavigate()
    const fetchInvoices = () =>
    {

        fetch("https://rent-hive-backend.vercel.app/invoices",
        {
            method: "GET",
            headers:
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            }
        })
        .then(response => response.json())
        .then(data =>
        {
            data.type === "error"
            ?
                data.reason === "Invalid credentials"
                ?
                    toast.error(data.message,
                        {
                            onClose: () => navigate(-1)
                        }
                    )
                :
                    toast.error(data.message)
            :
                setInvoices(data.invoices)
        }
        )
    }

    return (
        <>
            <nav className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 p-3 bg-light shadow-sm rounded">
                {
                    filters.map((filter) => (
                        <button key={filter} onClick={() => setFilter(filter)} className={`btn ${invoiceFilter === filter ? "btn-primary" : "btn-outline-primary"} px-4 py-2`}>
                            {filter} invoices
                        </button>
                    ))
                }
            </nav>
            
        </>
    )
}

export default Invoices