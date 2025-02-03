import { useState } from "react"

const Invoices = () => 
{
    const [invoiceFilter, setFilter] = useState("All")

    const filters = ["All", "Pending", "Paid", "Overdue"]

    return (
        <nav className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 p-3 bg-light shadow-sm rounded">
            {
                filters.map((filter) => (
                    <button key={filter} onClick={() => setFilter(filter)} className={`btn ${invoiceFilter === filter ? "btn-primary" : "btn-outline-primary"} px-4 py-2`}>
                        {filter}
                    </button>
                ))
            }
        </nav>
    )
}

export default Invoices