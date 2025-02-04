import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

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
        setLoading(true)
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
        })
    }

    useEffect(() => fetchInvoices(),[])

    console.log(invoices)

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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="text-white text-uppercase bg-success">Invoice No</th>
                        <th scope="col" className="text-white text-uppercase bg-success">Invoice Date</th>
                        <th scope="col" className="text-white text-uppercase bg-success">Amount</th>
                        <th scope="col" className="text-white text-uppercase bg-success">Due Date</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Invoice No" className='text-center p-4'>INV0001</td>
                        <td data-label="Invoice Date" className='text-center p-4'>2024-03-02</td>
                        <td data-label="Amount" className='text-center p-4'>Kshs. 25,000.00</td>
                        <td data-label="Due Date" className='text-center p-4'>2024-04-02</td>
                        <td className='text-center p-4'>
                            <Link to="/dashboard/invoices/" className="btn btn-primary">View invoice details</Link>
                        </td>
                    </tr>
                    <tr>
                        <td data-label="Invoice No" className='text-center p-4'>INV0002</td>
                        <td data-label="Invoice Date" className='text-center p-4'>2024-03-02</td>
                        <td data-label="Amount" className='text-center p-4'>Kshs. 25,000.00</td>
                        <td data-label="Due Date" className='text-center p-4'>2024-04-02</td>
                        <td className='text-center p-4'>
                            <Link to="/dashboard/invoices/" className="btn btn-primary">View invoice details</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Invoices