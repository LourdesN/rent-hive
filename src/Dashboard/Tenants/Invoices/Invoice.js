import { useParams } from "react-router-dom"

const Invoice = () =>
{
    const { ref } = useParams()

    const formatCurrency = value => 
    new Intl.NumberFormat("en-KE", 
    { 
        style: "currency", 
        currency: "KES", 
        minimumFractionDigits: 2 
    }).format(value)

    return(
        <>
            <h1>Invoice page for invoice no {ref}</h1>
            <div className="d-flex justify-content-end">
                <h2>Invoice details</h2>
                <p><b>Invoice number:</b>: {ref}</p>
                <p><b>Invoice date</b>: 2025-02-05</p>
                <p><b>Due date</b>: 2025-03-05</p>
            </div>
            <div className="d-flex justify-content-start">
                <h2>Billed to</h2>
                <p><b>Name</b>: Samuel Muigai</p>
                <p><b>Phone number:</b> +254707251073</p>
                <p><b>Email address:</b> ndungu.muigai01@gmail.com</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Item No</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Rent deposit for property 1</td>
                        <td>{formatCurrency(75000)}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <h2>Payment details</h2>
            </div>
        </>
    )

}
export default Invoice