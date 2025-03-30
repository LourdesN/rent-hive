import { useState } from "react";

function PaymentForm({phone_number,setEditModalOpen,amount}) {
    const [phone, setPhone] = useState(phone_number);
   
    const [message, setMessage] = useState("");

    const handlePayment = async () => {
        const response = await fetch("/api/initiate-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone_number: phone,
                amount: amount,
            }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Phone number"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                
            />
            <button onClick={handlePayment}>Pay via M-Pesa</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PaymentForm;
