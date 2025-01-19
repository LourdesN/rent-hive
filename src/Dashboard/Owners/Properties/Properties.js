/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import { FaMapMarkerAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import Loader from "../../../Assets/Components/Loader"
import CircularProgress from "@mui/material/CircularProgress"

const Properties = () => 
{
    const navigate = useNavigate()
    const [loading, setLoading]=useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activePage, setActivePage] = useState(1)
    const [isModalOpen, setModalOpen] = useState(false)
    const initialPropertyDetails=
    {
        name: "",
        description: "",
        type: "",
        rent: 0,
        location: "",
        images: [],
    }
    const [propertyDetails, setPropertyDetails] = useState(initialPropertyDetails)
    const [searchResults, setSearchResults] = useState([])
    const [properties, setProperties]=useState([])

    const fetchProperties = () =>
    {
        setLoading(true)
        fetch("https://rent-hive-backend.vercel.app/properties",
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
                data.reason === "Invalid credentials"
                ?
                    toast.error(data.message,
                    {
                        onClose: () => navigate(-1)
                    })
                :
                    toast.error(data.message)
            :
                    setProperties(data.properties)
        })
        .finally(()=> setLoading(false))
    }

    useEffect(()=> fetchProperties(),[])
    
    const propertiesPerPage = 4

    const indexOfLastProperty = activePage * propertiesPerPage
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty)

    const handlePageChange = pageNumber => setActivePage(pageNumber)

    const handleInputChange = e => 
    {
        setPropertyDetails((prevDetails) => ({ ...prevDetails, [e.target.name]: e.target.value }))
        if (e.target.name === 'location') 
        {
            fetchLocationSuggestions(e.target.value)
        }
    }

    const fetchLocationSuggestions = async (query) => {
        if (query.length > 2) 
        { // Only fetch if the query has more than 2 characters
            try 
            {
                const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=u6yB4aVuy7TirPp2UQFLMg-xe1NnafnrcN2w9klsclU&limit=5`)
                if (!response.ok) 
                {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setSearchResults(data.items.map(item => ({
                    label: `${item.address.label}, ${item.address.countryName}`,
                    position: item.position
                })))
            } 
            catch (error) 
            {
                toast.error("Error fetching location:", error)
                setSearchResults([]) // Clear suggestions on error
            }
        } 
        else 
        {
            setSearchResults([])
        }
    }

    const handleImageChange = e => 
    {
        const files = Array.from(e.target.files)
        setPropertyDetails((prevDetails) => ({ ...prevDetails, images: files }))
    }

    const formatCurrency = value => 
        new Intl.NumberFormat("en-KE", 
        { 
            style: "currency", 
            currency: "KES", 
            minimumFractionDigits: 2 
        }).format(value)

    const addProperty = e => 
    {
        e.preventDefault()
        setIsSubmitting(true)
        const formData=new FormData()
        formData.append('name',propertyDetails.name)
        formData.append('description',propertyDetails.description)
        formData.append('property_type',propertyDetails.type)
        formData.append('rent',propertyDetails.rent)
        formData.append('location',propertyDetails.location)
        propertyDetails.images.forEach(image => formData.append("images[]",image))
        fetch("https://rent-hive-backend.vercel.app/properties",
        {
            method: "POST",
            headers:
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => 
        {
            data.type === "success"
            ?
                toast.success(data.message)
            :
                toast.error(data.message)
        })
        .finally(()=> 
        {
            setPropertyDetails(initialPropertyDetails)
            setModalOpen(false)
            setIsSubmitting(false)
            fetchProperties()
        })
    }

    return (
        <div className="container py-2">
            {loading && <Loader/>}
            <h1 className="text-uppercase fs-2 fw-bold text-center">Properties owned by Samuel Muigai</h1>
            <div className="d-flex justify-content-end gap-2 p-3">
                <button className="btn btn-primary" onClick={() => setModalOpen(!isModalOpen)}>
                    <IoAddOutline className="fs-4" /> Add a new property
                </button>
            </div>
            <div className="row">
                {
                    currentProperties.length === 0
                    ?
                        <div className="d-flex flex-column align-items-center justify-content-center w-100 my-5">
                            <h4 className="text-muted mt-3">No properties found</h4>
                        </div>
                    :
                        currentProperties.map(property => 
                            <div key={property.id} className="col-12 col-md-6 col-lg-3 mb-2">
                                <div className="card h-100 border rounded shadow-sm overflow-hidden">                                   
                                    {
                                        property.images.map(image =>
                                            <img key={image.id} src={`https://mobikey-lms.s3.amazonaws.com/${image.image_url}`} alt="Property" className="h-50 object-fit z-50"/>
                                        )
                                    }
                                    <div className="card-body d-flex flex-column">
                                        <p className="card-text">{property.description}</p>
                                        <p className="card-text">Rent per month: <b>Kshs. {property.rent}</b></p>
                                        <p className="text-muted d-flex align-items-center">
                                            <FaMapMarkerAlt /> {property.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )    
                }
            </div>

            {/* Modal for Adding New Property */}
            {
                isModalOpen && 
                    <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" encType="multipart/form-data" tabIndex={1} onSubmit={addProperty}>
                        <div className="bg-white w-75">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Add a new property</h5>
                                <button type="button" className="btn-close" onClick={() => {
                                    setModalOpen(!isModalOpen)
                                    setPropertyDetails(initialPropertyDetails)
                                    setSearchResults([])
                                    setIsSubmitting(false)
                                }}></button>
                            </div>
                            <div className="modal-body row">
                                <div className="col-12 col-md-6 col-lg-6 mb-3">
                                    <label className="form-label">Property Name</label>
                                    <input type="text" className="form-control" id="property_name" name="name" value={propertyDetails.name} onChange={handleInputChange} required></input>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mb-3">
                                    <label className="form-label">Property Description</label>
                                    <textarea className="form-control" id="propertyDescription" name="description" value={propertyDetails.description} onChange={handleInputChange} required></textarea>
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mb-3">
                                    <label className="form-label">Rent</label>
                                    <input type="range" className="form-range" id="propertyRent" name="rent" min={0} max={90000} step={1000} value={propertyDetails.rent} onChange={handleInputChange} required/>
                                    <span className="mt-2">
                                        <strong>{formatCurrency(propertyDetails.rent)}</strong>
                                    </span>
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mb-3">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-control" id="propertyLocation" name="location" value={propertyDetails.location} onChange={handleInputChange} placeholder="Search location" required/>
                                    {
                                        searchResults.length > 0 && 
                                            <div className="dropdown-menu show my-1" style={{ maxHeight: "200px"}}>
                                                {searchResults.map((result, index) => (
                                                    <button key={index} className="dropdown-item" type="button" onClick={() => {
                                                        setPropertyDetails(prev => ({ ...prev, location: result.label }))
                                                        setSearchResults([])
                                                    }}>
                                                        {result.label}
                                                    </button>
                                                ))}
                                            </div>
                                    }
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 mb-3">
                                    <label className="form-label">Property type</label>
                                    <select className="form-select" id="property_type" name="type" value={propertyDetails.property_type} onChange={handleInputChange} required>
                                        <option value="">Select property type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Residential">Residential</option>
                                    </select>
                                </div>

                                {/* Multiple Image Input */}
                                <div className="col-12 mb-3">
                                    <label className="form-label">Property Images</label>
                                    <input type="file" accept="image/*" className="form-control" multiple onChange={handleImageChange} required/>
                                </div>

                                {/* Image Preview Section */}
                                <div className="col-12">
                                    <div className="d-flex flex-wrap gap-2">
                                        {
                                            propertyDetails.images.map((image, index) => 
                                                <div key={index} className="position-relative">
                                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="img-thumbnail" style={{ width: "100px", height: "100px", objectFit: "cover" }}/>
                                                </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    setModalOpen(!isModalOpen)
                                    setPropertyDetails(initialPropertyDetails)
                                    setSearchResults([])
                                    setIsSubmitting(false)
                                }}>Close</button>
                                <button type="submit" className={`btn btn-primary ${isSubmitting ? "disabled" : ""}`}>
                                    {
                                        isSubmitting
                                        ?
                                            <CircularProgress size={20}/>
                                        :
                                            "Add Property"
                                }</button>
                            </div>
                        </div>
                    </form>
            }

            <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(activePage - 1)}>«</button>
                    </li>
                    {[...Array(Math.ceil(properties.length / propertiesPerPage)).keys()].map((number) => (
                        <li key={number + 1} className={`page-item ${number + 1 === activePage ? "active" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${activePage === Math.ceil(properties.length / propertiesPerPage) ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(activePage + 1)}>»</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Properties