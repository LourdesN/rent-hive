/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { formatCurrency } from "../../Calculations/Format Currency"

import CircularProgress from "@mui/material/CircularProgress"

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
        .finally(() => setLoading(false))
    }

    useEffect(() => fetchInvoices(),[])

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
                        {
                            loading
                            ?
                                <tr>
                                    <td colSpan={5} className="text-center"><CircularProgress size={30}/></td>
                                </tr>
                            :
                                invoices.length > 0
                                ?
                                    invoices.map(invoice =>
                                        <tr key={invoice.ref_no}>
                                            <td data-label="Invoice No" className='text-center p-4'>{invoice.ref_no}</td>
                                            <td data-label="Invoice Date" className='text-center p-4'>{invoice.invoice_date}</td>
                                            <td data-label="Amount" className='text-center p-4'>{formatCurrency(invoice.amount)}</td>
                                            <td data-label="Due Date" className='text-center p-4'>{invoice.due_date}</td>
                                            <td className='text-center p-4'>
                                                <Link to={`/dashboard/invoices/${invoice.ref_no}`} className="btn btn-primary">View invoice details</Link>
                                            </td>
                                        </tr>
                                    )
                                :
                                    <tr>
                                        <td colSpan={5} className="text-center">No invoices found</td> 
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Invoices