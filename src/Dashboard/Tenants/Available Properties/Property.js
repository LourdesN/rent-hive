/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "../../../Assets/CSS/Images.css";
import ImageSlider from "../../Components/ImageSlider";

import CircularProgress from "@mui/material/CircularProgress"

const AvailableProperty = () => 
{
    const navigate = useNavigate()
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [ownerDetails, setOwnerDetails]=useState(null)
    const [isModalOpen, setIsModalOpen]=useState(false)
    const [isSubmitting, setIsSubmitting]=useState(false)
    const [leasePeriod, setLeasePeriod]=useState("")
    const initialLeaseData=
    {
        property_id: id,
        start_date: "",
        end_date: "",
    }
    const [leaseData, setLeaseData] = useState(initialLeaseData)

    const fetchProperty = () =>
    {
        fetch(`https://rent-hive-backend.vercel.app/available-properties/${id}`, 
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
                setOwnerDetails(data.owner)
        })
    }

    useEffect(() => fetchProperty(), [id, navigate])

    const handleInputChange = e => setLeaseData({...leaseData, [e.target.id]: e.target.value})

    const formatCurrency = number => 
    {
        return new Intl.NumberFormat('en-KE', 
        {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(number)
    }

    useEffect(() => 
    {
        // Prevent running if start_date is empty
        if (!leaseData.start_date) return 
    
        //Creating an object with the expected lease period and the number of months for each and using object lookup with bracket notation to set the number of months accordingly
        const monthsToAdd = 
        {
            "3 months": 3,
            "6 months": 6,
            "9 months": 9,
            "1 year": 12
        }[leasePeriod] || 0
    
        if (monthsToAdd > 0) 
        {
            const startDate = new Date(leaseData.start_date)
            startDate.setMonth(startDate.getMonth() + monthsToAdd)
    
            setLeaseData(prev => ({
                ...prev,
                end_date: startDate.toISOString().split("T")[0] // Format as YYYY-MM-DD
            }))
        }
    }, [leasePeriod, leaseData.start_date])

    const createLease = e =>
    {
        e.preventDefault()
        console.log(leaseData)
    }

    return (
        <div className="container mt-2">
           {property?.images && <ImageSlider images={property.images} />}

            <div className="row mt-3">
                {/* Property Details */}
                <div className="col-md-8">
                    <div className="card p-4 shadow-sm">
                        <h1 className="lead fw-bold text-uppercase fs-4">{property?.name}</h1>
                        <p className="lead">{property?.description}</p>
                        <h5 className="text-secondary">
                            <strong>Location:</strong> {property?.location}
                        </h5>
                        <h4 className="text-primary">Rent per month: Ksh {formatCurrency(property?.rent)}</h4>
                        <div className="mt-3 d-flex gap-2">
                            <button className="btn btn-success" onClick={()=> setIsModalOpen(true)}>Lease Property</button>
                            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </div>

                {/* Owner Details */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h5 className="text-center">Owner Details</h5>
                        <hr />
                        <p><strong>Name:</strong> {ownerDetails?.first_name} {ownerDetails?.last_name}</p>
                        <p><strong>Email:</strong> {ownerDetails?.email}</p>
                        <p><strong>Phone:</strong> {ownerDetails?.phone_number}</p>
                    </div>
                </div>
            </div>

            {/* Lease modal form */}
            {
                isModalOpen &&
                <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" encType="multipart/form-data" tabIndex={1} onSubmit={createLease}>
                    <div className="bg-white w-75">
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title">Lease Property</h5>
                            <button type="button" className="btn-close" onClick={() => 
                            {
                                setIsModalOpen(false)
                                setLeaseData(initialLeaseData)
                                setLeasePeriod("")
                            }}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Lease Start Date:</label>
                                <input type="date" className="form-control" id="start_date" min={new Date().toISOString().split("T")[0]} value={leaseData.start_date} onChange={handleInputChange} required/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Lease Period</label>
                                <select className="form-select" value={leasePeriod} onChange={e => setLeasePeriod(e.target.value)} required>
                                    <option value="">Select lease period</option>
                                    <option value="3 months">3 months</option>
                                    <option value="6 months">6 months</option>
                                    <option value="9 months">9 months</option>
                                    <option value="1 year">1 year</option>
                                </select>
                            </div>
                            {
                                property?.deposit_required &&
                                (
                                    <div className="mb-3 text-danger fw-bold text-uppercase">
                                        <p>NB: Once you lease this property, you will be required to pay a deposit of Kshs. {formatCurrency(property?.rent)} before moving in.</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="modal-footer border-top">
                            <button type="button" className="btn btn-secondary" onClick={()=>
                                {
                                    setIsModalOpen(!isModalOpen)
                                    setLeaseData(initialLeaseData)
                                    setLeasePeriod("")
                                }
                            }>Close</button>
                            <button type="submit" className={`btn btn-primary ${isSubmitting ? "disabled" : ""}`}>
                                {
                                    isSubmitting
                                    ?
                                        <CircularProgress size={25}/>
                                    :
                                        "Submit"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}

export default AvailableProperty
