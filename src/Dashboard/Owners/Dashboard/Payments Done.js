import { Link } from "react-router-dom";

const PaymentsReceived = () => 
{
  // Sample payment history data
  const payments = [
    { id: 1, date: "2024-12-01", amount: "Kshs. 12,000.00", status: "Paid" },
    { id: 2, date: "2024-12-05", amount: "Kshs. 85,000.00", status: "Pending" },
    { id: 3, date: "2024-12-10", amount: "Kshs. 20,000.00", status: "Paid" },
  ];

  return (
    <div className="w-100">
        <h1 className="text-uppercase fs-3 fw-bold text-center">Payments Received</h1>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.date}</td>
                            <td>{payment.amount}</td>
                            <td>
                                <span className={`${payment.status === "Paid" ? "text-success": "text-warning"}`}>{payment.status}</span>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td colSpan={3}>
                        <Link to="" className="text-blue-600 hover:text-blue-800 font-semibold underline d-flex justify-content-end">See more</Link>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
  );
};

export default PaymentsReceived;
