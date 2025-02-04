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
            <nav className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 p-3">
                {
                    filters.map((filter) => (
                        <button key={filter} onClick={() => setFilter(filter)} className={`btn ${invoiceFilter === filter ? "btn-primary" : "btn-outline-primary"} px-4 py-2`}>
                            {filter} invoices
                        </button>
                    ))
                }
            </nav>
            <div className="overflow-x-auto p-2 px-md-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Invoice No</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Invoice Date</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Amount</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Due Date</th> 
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Invoice No" className='text-center p-2'>INV0001</td>
                            <td data-label="Invoice Date" className='text-center p-2'>2024-03-02</td>
                            <td data-label="Amount" className='text-center p-2'>Kshs. 25,000.00</td>
                            <td data-label="Due Date" className='text-center p-2'>2024-04-02</td>
                            <td className='text-center p-2'>
                                <Link to="/dashboard/invoices/" className="btn btn-primary">View invoice details</Link>
                            </td>
                        </tr>
                        <tr>
                            <td data-label="Invoice No" className='text-center p-2'>INV0002</td>
                            <td data-label="Invoice Date" className='text-center p-2'>2024-03-02</td>
                            <td data-label="Amount" className='text-center p-2'>Kshs. 25,000.00</td>
                            <td data-label="Due Date" className='text-center p-2'>2024-04-02</td>
                            <td className='text-center p-2'>
                                <Link to="/dashboard/invoices/" className="btn btn-primary p-2">View invoice details</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Invoices