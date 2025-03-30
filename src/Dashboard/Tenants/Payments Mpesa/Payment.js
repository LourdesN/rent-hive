import { useState } from "react"

function PaymentForm({phone_number,setEditModalOpen, amount}) 
{
    const [phone, setPhone] = useState(phone_number)
   
    const [message, setMessage] = useState("")

    //State to handle form submission
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handlePayment = async () => 
    {
        const response = await fetch("/api/initiate-payment", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone_number: phone,
                amount: amount,
            }),
        })
        const data = await response.json()
        setMessage(data.message)
    }

    return (
        <div className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <div className="modal-header">
                    <h5 className="modal-title text-xl font-semibold">Make a Payment</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => { setEditModalOpen(false) }}></button>
                </div>
                <div className="modal-body row">
                    <div className="col-md-6">
                        <input type="text" placeholder="Phone number" value={phone_number} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2"/>
                    </div>
                    <div className="col-md-6">
                        <input type="number" placeholder="Amount" value={amount} className="w-full p-2 border border-gray-300 rounded mb-2" disabled/>
                    </div>
                </div>
                <div className="modal-footer border-top">
                    <button type="button" className="w-full p-2 btn btn-secondary rounded" onClick={() => { setEditModalOpen(false) }}>Cancel</button>
                    <button onClick={handlePayment} className="w-full p-2 btn btn-success rounded"> Pay via M-Pesa</button>
                </div>
                
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
        </div>
    )
}

export default PaymentForm