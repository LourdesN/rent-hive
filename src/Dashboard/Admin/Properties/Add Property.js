import { useState } from "react"
import { toast } from "react-toastify"
import { formatCurrency } from "../../Calculations/Format Currency"
import { CircularProgress } from "@mui/material"

const AdminAddProperty = ({addModal, setAddModal, fetchProperties, owners}) => 
{
    //State to keep track of form submission status
    const [isSubmitting, setIsSubmitting] = useState(false)

    //State to keep track of location search results
    const [searchResults, setSearchResults] = useState([])

    //Initial property state values
    const initialPropertyDetails=
        {
            name: "",
            description: "",
            type: "",
            rent: 0,
            location: "",
            deposit: "",
            images: [],
            owner_id: null
        }
    
    //State to keep track of form values: Copies the initial property state
    const [propertyDetails, setPropertyDetails] = useState(initialPropertyDetails)

    //Function to handle form input changes
    const handleInputChange = e => 
    {
        setPropertyDetails((prevDetails) => ({ ...prevDetails, [e.target.name]: e.target.value }))
        if (e.target.name === 'location') 
        {
            fetchLocationSuggestions(e.target.value)
        }
    }

    //Function to fetch locations based on user input
    const fetchLocationSuggestions = async query => 
    {
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
    
    //Function to handle image upload
    const handleImageChange = e => 
    {
        const files = Array.from(e.target.files)
        setPropertyDetails((prevDetails) => ({ ...prevDetails, images: files }))
    }

    //Form submission function: Sends data to the backend 
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
        formData.append('deposit',propertyDetails.deposit)
        formData.append('owner_id',propertyDetails.owner_id)
        propertyDetails.images.forEach(image => formData.append("images[]",image))

        fetch("https://rent-hive-backend.vercel.app/all-properties",
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
            setAddModal(false)
            setIsSubmitting(false)
            fetchProperties()
        })
    }

    return ( 
        <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" encType="multipart/form-data" tabIndex={1} onSubmit={addProperty}>
            <div className="bg-white w-75">
                <div className="modal-header border-bottom">
                    <h5 className="modal-title">Add a new property</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => {
                        setAddModal(!addModal)
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
                    <div className="col-12 col-md-6 mb-3">
                        <label className="form-label">Property Images</label>
                        <input type="file" accept="image/*" className="form-control" multiple onChange={handleImageChange} required/>
                    </div>
                    
                    {/* Deposit required checkboxes */}
                    <div className="col-6 col-md-3 mb-3">
                        <label className="form-label">Deposit required</label>
                        <div className="d-flex flex-row gap-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="deposit" value="Yes" checked={propertyDetails.deposit === "Yes"} onChange={handleInputChange} required/>
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="deposit" value="No" checked={propertyDetails.deposit === "No"} onChange={handleInputChange} required/>
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-3 mb-3">
                        <label className="form-label">Home owner</label>
                        {/* Select dropdown for the home owners */}
                        <select className="form-select" id="owner_id" name="owner_id" value={propertyDetails.owner_id} onChange={handleInputChange}>
                            <option value="">Select home owner</option>
                            {
                                owners.map(owner =>
                                {
                                    return(
                                        <option key={owner.id} value={owner.id}>{owner.first_name} {owner.last_name}</option>
                                    )
                                }
                                )
                            }
                        </select>
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
                    <button type="button" className={`btn btn-secondary ${isSubmitting ? "disabled" : ""}`} onClick={() => {
                        setAddModal(!addModal)
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
    )
}
 
export default AdminAddProperty