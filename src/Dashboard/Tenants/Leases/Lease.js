/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../Calculations/Format Currency"

import Carousel from "../../Components/Carousel"
import Loader from "../../../Assets/Components/Loader";
import { toast } from "react-toastify";

const Lease = () => 
{
    const {id}=useParams()
    const navigate=useNavigate()
    const [loading, setLoading]= useState(false)
    const [leaseDetails, setLeaseDetails] = useState()

    useEffect(()=>
    {
        setLoading(true)
        fetch(`https://rent-hive-backend.vercel.app/leases/${id}`,
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
                data.reason === "Invalid credentials" || data.reason === "Lease not found"
                ?
                    toast.error(data.message,
                    {
                        onClose: ()=> navigate(-1)
                    })
                :
                    toast.error(data.error)
            :
                setLeaseDetails(data.lease)
        })
        .finally(()=> setLoading(false))
    },[id])

    return ( 
        <div className="container mt-2">
            {
                loading
                ?
                    <Loader/>
                :
                    <>
                        <div className="row mt-2">
                            <div className="col-12 col-md-6">
                                <div className="card p-2 shadow-sm gap-1">
                                    <Carousel images={leaseDetails?.property.images || []}/>
                                    <h1 className="lead fw-bold text-uppercase fs-4">{leaseDetails?.property.name}</h1>
                                    <p className="lead">{leaseDetails?.property.description}</p>
                                    <p className="text-secondary">
                                        <strong>Property type:</strong> {leaseDetails?.property.property_type}</p>
                                    <h5 className="text-secondary">
                                        <strong>Location:</strong> {leaseDetails?.property.location}
                                    </h5>
                                    <h4 className="text-primary">Rent per month: {formatCurrency(leaseDetails?.rent_amount)}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex flex-column gap-2 gap-md-5 mt-2 mt-md-0">
                                <div className="card p-3 shadow-sm gap-3 col-md-12">
                                    <h2 className="text-uppercase text-decoration-underline fs-5 fw-bold">Lease Details</h2>
                                    <p>Start Date: {leaseDetails?.start_date || ""}</p>
                                    <p>End Date: {leaseDetails?.end_date || ""}</p>
                                    <p>Lease duration: {leaseDetails?.duration || ""}</p>
                                </div>
                                <div className="card p-3 shadow-sm gap-3 col-md-12">
                                    <h2 className="text-uppercase text-decoration-underline fs-5 fw-bold">Property owner's details</h2>
                                    <p>Name: {`${leaseDetails?.owner.first_name} ${leaseDetails?.owner.last_name}` || ""}</p>
                                    <p>Email address: {leaseDetails?.owner.email || ""}</p>
                                    <p>Phone Number: {leaseDetails?.owner.phone_number || ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-secondary" onClick={()=> navigate(-1)}>Back</button>
                        </div>
                    </>
            }
            
        </div>
     );
}
 
export default Lease;