import { useState } from "react"
import { formatCurrency } from "../../Calculations/Format Currency"
import { toast } from "react-toastify"

const EditProperty = ({ setEditModalOpen, propertyDetails }) => 
{
    //State to check if the form is submitting
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Extracting the values from the passed down prop
    let { id, name, property_type, deposit_required, rent, location, description, images } = propertyDetails

    // Altering the deposit required obtained from the database
    if (deposit_required === true) 
    {
        deposit_required = "Yes"
    } 
    else 
    {
        deposit_required = "No"
    }

    // Creating a new state for the property values
    const [newPropertyDetails, setNewPropertyDetails] = useState({
        id,
        name,
        property_type,
        deposit_required,
        rent,
        location,
        description,
        images : images || []
    })

    // Function to handle input change and update the property details state
    const handleInputChange = e => setNewPropertyDetails({ ...newPropertyDetails, [e.target.name]: e.target.value })

    // Function to handle images upload
    const handleImageChange = e => 
    {
        const files = Array.from(e.target.files)
        setNewPropertyDetails(prevDetails => ({ ...prevDetails, images: [...prevDetails.images, ...files] }))
    }

    //Function to handle image delete
    const handleImageDelete = id => setNewPropertyDetails(prevDetails => ({...prevDetails, images: prevDetails.images.filter(image => id !== image.id)}))

    //Function to handle form submission
    const updateDetails = e =>
    {
        e.preventDefault()
        setIsSubmitting(true)
        toast.success("Form submitted")
        console.log(newPropertyDetails)
        setTimeout(() => setIsSubmitting(false), 3000);
    }

    return (
        <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" onSubmit={updateDetails}>
            <div className="bg-white w-75">
                <div className="modal-header border-bottom">
                    <h5 className="modal-title">Edit {newPropertyDetails.name}'s details</h5>
                    <button type="button" className="btn-close" onClick={() => { setEditModalOpen(false) }}></button>
                </div>
                <div className="modal-body row">
                    <div className="col-12 col-md-6 col-lg-6 mb-3">
                        <label className="form-label">Property Description:</label>
                        <textarea className="form-control" name="description" value={newPropertyDetails.description} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-3">
                        <label className="form-label">Location</label>
                        <input type="text" className="form-control" name="location" value={newPropertyDetails.location} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <label className="form-label">Rent:</label>
                        <input type="range" className="form-range" name="rent" value={newPropertyDetails.rent} min={0} max={900000} step={1000} onChange={handleInputChange} />
                        <span className="mt-2">
                            <strong>{formatCurrency(newPropertyDetails.rent)}</strong>
                        </span>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <label className="form-label">Add new property images</label>
                        <input type="file" accept="image/*" className="form-control" multiple onChange={handleImageChange} />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <label className="form-label">Deposit required</label>
                        <div className="d-flex flex-row gap-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="deposit_required" value="Yes" checked={newPropertyDetails.deposit_required === "Yes"} onChange={handleInputChange} required />
                                <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="deposit_required" value="No" checked={newPropertyDetails.deposit_required === "No"} onChange={handleInputChange} required />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    {/* Image Preview Section */}
                    <div className="col-12">
                        <div className="d-flex flex-wrap gap-2">
                            {
                                newPropertyDetails.images.length > 0 &&
                                    newPropertyDetails.images.map((image, index) => 
                                    {
                                        //Checking if the image is a new file or an existing one
                                        const imageUrl=image instanceof File ? URL.createObjectURL(image) : `https://mobikey-lms.s3.amazonaws.com/${image.image_url}`

                                        return (
                                            <div key={image.id} className="position-relative p-3">
                                                <img src={imageUrl} alt={`Preview ${image.id}`} className="img-thumbnail" style={{ width: "120px", height: "120px",  objectFit: "cover" }}/>
                                                <button type="button" className="position-absolute top-0 end-0 text-white border-0 btn-close" onClick={() => handleImageDelete(image.id)} style={{ cursor: "pointer" }} title="Remove image"></button>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-footer border-top">
                    <button type="button" className="btn btn-secondary" onClick={() => { setEditModalOpen(false) }}>Cancel</button>
                    <button type="submit" className={`btn btn-primary ${isSubmitting ? "disabled" : " "}`}>
                        {
                            isSubmitting
                            ?
                                "Saving changes..."
                            :
                                "Save changes"
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditProperty
