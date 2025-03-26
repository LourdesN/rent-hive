import { formatCurrency } from "../../Calculations/Format Currency"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import ImageSlider from "../../Components/ImageSlider"

import EditProperty from "./Edit property"

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
            {property?.images && <ImageSlider images={property.images}/>}

            <div className="row">
                {/* Property details */}
                <div className="col-md-6">
                    <div className="card p-3 shadow-sm">
                        <h1 className="lead fw-bold text-uppercase fs-4">{property?.name}</h1>
                        <p className="lead">{property?.description}</p>
                        <h5 className="text-secondary">
                            <strong>Location:</strong> {property?.location}
                        </h5>
                        <h4 className="text-primary">Rent per month: {formatCurrency(property?.rent)}</h4>
                        <div className="mt-1 d-flex gap-2">
                            <button className="btn btn-success" onClick={()=> setEditModalOpen(true)}>Edit Property</button>
                            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </div>

                {/* Tenant section */}
                {
                    property?.property_status === "Leased" &&
                
                    <div className="col-md-6">
                        <div className="d-flex flex-column flex-lg-row gap-3">
                            {/* Tenant details */}
                            <div className="card p-3 shadow-sm flex-fill">
                                <h5 className="text-center">Tenant Details</h5>
                                <hr />
                                <p className="mb-2"><strong>Name:</strong> {tenantDetails?.first_name} {tenantDetails?.last_name}</p>
                                <p className="mb-2"><strong>Email:</strong> {tenantDetails?.email}</p>
                                <p className="mb-2"><strong>Phone number:</strong> {tenantDetails?.phone_number}</p>
                            </div>

                            {/* Lease details */}
                            <div className="card p-3 shadow-sm flex-fill">
                                <h5 className="text-center">Lease Details</h5>
                                <hr />
                                <p className="mb-2"><strong>Start date:</strong> {leaseDetails?.start_date}</p>
                                <p className="mb-2"><strong>End date:</strong> {leaseDetails?.end_date}</p>
                                <p className="mb-2"><strong>Lease period:</strong> {leaseDetails?.duration}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {/* Modal for editing property details */}
            {
                editModalOpen && <EditProperty setEditModalOpen={setEditModalOpen} propertyDetails={property}/>
            }
        </div>
    )
}

export default Property