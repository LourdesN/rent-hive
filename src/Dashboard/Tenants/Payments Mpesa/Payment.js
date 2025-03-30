import { useState } from "react";

function PaymentForm({phone_number,setEditModalOpen,amount}) {
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay via M-Pesa</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PaymentForm;
