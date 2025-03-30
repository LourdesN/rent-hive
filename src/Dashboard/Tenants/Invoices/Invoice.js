import { useParams, useNavigate } from "react-router-dom"
import { formatCurrency } from "../../Calculations/Format Currency"
import { useState } from "react"
import PaymentForm from "../Payments Mpesa/Payment"

const Invoice = () =>
{
    const { ref } = useParams()
    const navigate = useNavigate()

    //State to handle the edit payment form modal
    const [editModalOpen, setEditModalOpen]=useState(false)

    const phone_number = "+254707251073"
    const amount = 75000

    return(
        <div className="mx-5">
            <div className="d-flex justify-content-end">
                <div className="py-2">
                    <p><strong>Invoice no:</strong> {ref}</p>
                    <p><strong>Invoice date:</strong> 2024-02-02</p>
                    <p><strong>Due date:</strong> 2024-03-02</p>
                </div>
            </div>
            <div className="d-flex justify-content-start">
                <div className="py-2">
                    <h2>Billed to</h2>
                    <p><strong>Name:</strong> Samuel Muigai</p>
                    <p><strong>Email address:</strong> ndungu.muigai01@gmail.com</p>
                    <p><strong>Phone number:</strong> +254707251073</p>
                </div>
            </div>
            <table className="table mx-auto text-center mt-4">
                <thead>
                    <tr>
                        <th scope="col" className="text-white text-uppercase text-center bg-success">Item No</th>
                        <th scope="col" className="text-white text-uppercase text-center bg-success">Description</th>
                        <th scope="col" className="text-white text-uppercase text-center bg-success">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Item No" className='text-center p-4'>1</td>
                        <td data-label="Description" className='text-center p-4'>Rent deposit for property 1</td>
                        <td data-label="Amount" className='text-center p-4'>{formatCurrency(amount)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="d-flex justify-content-center gap-5">
                <button className="paynow btn btn-success" onClick={()=> setEditModalOpen(true)}> Pay Via Mpesa</button>
                <button className="btn btn-secondary" onClick={()=> navigate(-1)}>Back</button>
            </div>

            {/* Modal for editing payment details */}
            {
            editModalOpen && <PaymentForm phone_number={phone_number} amount={amount} setEditModalOpen={setEditModalOpen}/>
            }
        </div>
    )

}
export default Invoice