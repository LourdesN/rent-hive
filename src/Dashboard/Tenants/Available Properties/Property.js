/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Home from "../../../Assets/Images/home.jpeg"
import Houses from "../../../Assets/Images/houses.jpeg"
const AvailableProperty = () => 
{
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState(null);

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
                            <button className="btn btn-success">Lease Property</button>
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
        </div>
    );
};

export default AvailableProperty;
