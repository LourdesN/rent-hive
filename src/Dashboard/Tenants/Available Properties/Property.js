/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress"

import Home from "../../../Assets/Images/home.jpeg"
import Houses from "../../../Assets/Images/houses.jpeg"
const AvailableProperty = () => 
{
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState(null);
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
        });
    }

    useEffect(() => fetchProperty(), [id, navigate]);

    // Dummy data for preview
    const dummyProperty = {
        id: 1,
        images: [
            { id: 101, image_url: Home },
            { id: 102, image_url: Houses }
        ],
        description: "Spacious 3-bedroom apartment with modern amenities.",
        rent: 45000,
        location: {
            city: "Nairobi",
            address: "Westlands, Parklands Rd, House No. 12"
        },
        owner: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+254 712 345678"
        }
    };

    const propertyData = property || dummyProperty;

    const handleInputChange = e => setLeaseData({...leaseData, [e.target.id]: e.target.value})

    useEffect(() => 
    {
        // Prevent running if start_date is empty
        if (!leaseData.start_date) return; 
    
        const monthsToAdd = 
        {
            "3 months": 3,
            "6 months": 6,
            "9 months": 9,
            "1 year": 12
        }[leasePeriod] || 0;
    
        if (monthsToAdd > 0) 
        {
            const startDate = new Date(leaseData.start_date);
            startDate.setMonth(startDate.getMonth() + monthsToAdd);
    
            setLeaseData(prev => ({
                ...prev,
                end_date: startDate.toISOString().split("T")[0] // Format as YYYY-MM-DD
            }));
        }
    }, [leasePeriod, leaseData.start_date]);

    const createLease = e =>
    {
        e.preventDefault()
        console.log(leaseData)
    }

    return (
        <div className="container mt-2">
            <div className="row">
                {
                    propertyData.images.map(image => (
                        <div key={image.id} className="col-md-6 mb-2">
                            <img src={image.image_url} alt="Property" className="img-fluid rounded shadow-sm"/>
                        </div>
                    ))
                }
            </div>
            <div className="row mt-3">
                {/* Property Details */}
                <div className="col-md-8">
                    <div className="card p-4 shadow-sm">
                        <p className="lead">{propertyData.description}</p>
                        <h5 className="text-secondary">
                            <strong>Location:</strong> {propertyData.location.city}, {propertyData.location.address}
                        </h5>
                        <h4 className="text-primary">Rent per month: Ksh {propertyData.rent}</h4>
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
                        <p><strong>Name:</strong> {propertyData.owner.name}</p>
                        <p><strong>Email:</strong> {propertyData.owner.email}</p>
                        <p><strong>Phone:</strong> {propertyData.owner.phone}</p>
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
    );
};

export default AvailableProperty;
