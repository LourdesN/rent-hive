import { formatCurrency } from "../../Calculations/Format Currency"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import EditProperty from "./Edit property"
import Carousel from "../../Components/Carousel"

const Property = () =>
{
    const {id} = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState(null)
    const [tenantDetails, setTenantDetails] = useState(null)
    const [leaseDetails, setLeaseDetails] = useState(null)

    //State to handle the edit property form modal
    const [editModalOpen, setEditModalOpen]=useState(false)

    //Function to fetch the details from the backend
    const fetchPropertyDetails = () =>
    {
        fetch(`https://rent-hive-backend.vercel.app/properties/${id}`,
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
                data.reason === "Not found" || data.reason === "Invalid credentials"
                ?
                    toast.error(data.message, { onClose: () => navigate(-1) })
                :
                    toast.error(data.message)
            : 
                setProperty(data.property)
                setTenantDetails(data.tenant)
                setLeaseDetails(data.lease)
        })
    }

    //Invoking the fetch property function once page loads
    useEffect(()=> fetchPropertyDetails(), [id, navigate])

    return(
        <div className="container mt-1">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card p-2 shadow-sm gap-1">
                        <Carousel images={property?.images || []}/>
                        <h1 className="lead fw-bold text-uppercase fs-4">{property?.name}</h1>
                        <p className="lead">{property?.description}</p>
                        <p className="text-secondary">
                            <strong>Property type: </strong>{property?.property_type}
                        </p>
                        <h5 className="text-secondary">
                            <strong>Location: </strong>{property?.location}
                        </h5>
                        <h4 className="text-primary">Rent per month: {formatCurrency(property?.rent)}</h4>
                    </div>
                </div>

                {
                    property?.property_status === "Leased" &&

                    <div className="col-12 col-md-6 d-flex flex-column gap-2 gap-md-5 mt-2 mt-md-0">
                        <div className="card p-3 shadow-sm gap-3 col-md-12">
                            <h2 className="text-uppercase text-decoration-underline fs-5 fw-bold">Tenant details</h2>
                            <p ><strong>Name:</strong> {tenantDetails?.first_name} {tenantDetails?.last_name}</p>
                            <p ><strong>Email:</strong> {tenantDetails?.email}</p>
                            <p ><strong>Phone number:</strong> {tenantDetails?.phone_number}</p>
                        </div>
                        <div className="card p-3 shadow-sm gap-3 col-md-12">
                            <h2 className="text-uppercase text-decoration-underline fs-5 fw-bold">Lease details</h2>
                            <p ><strong>Start date:</strong> {leaseDetails?.start_date}</p>
                            <p ><strong>End date:</strong> {leaseDetails?.end_date}</p>
                            <p ><strong>Lease period:</strong> {leaseDetails?.duration}</p>
                        </div>
                    </div>
                }
            </div>
            
            <div className="d-flex justify-content-center gap-4 my-3">
                <button className="btn btn-success" onClick={()=> setEditModalOpen(true)}>Edit property details</button>
                <button className="btn btn-secondary" onClick={()=> navigate(-1)}>Back</button>
            </div>
            

            {/* Modal for editing property details */}
            {
                editModalOpen && <EditProperty setEditModalOpen={setEditModalOpen} propertyDetails={property}/>
            }
        </div>
    )
}

export default Property