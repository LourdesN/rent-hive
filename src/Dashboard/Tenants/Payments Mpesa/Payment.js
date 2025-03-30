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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
        <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
            onClick={handlePayment}
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Pay via M-Pesa
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
    );
}

export default PaymentForm;
