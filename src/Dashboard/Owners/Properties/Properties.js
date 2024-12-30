import { IoAddOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import Home from "../../../Assets/Images/home.jpeg";
import Houses from "../../../Assets/Images/houses.jpeg";
import { useState } from "react";

const Properties = () => 
{
    const [activePage, setActivePage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const initialPropertyDetails=
    {
        description: "",
        rent: 0,
        location: "",
        images: [],
    }
    const [propertyDetails, setPropertyDetails] = useState(initialPropertyDetails);

    const propertiesPerPage = 4;

    const properties = [
        {
            id: 1,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 54,000 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya",
        },
    ];

    const indexOfLastProperty = activePage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    const handlePageChange = (pageNumber) => setActivePage(pageNumber);

    const handleInputChange = e => setPropertyDetails((prevDetails) => ({...prevDetails, [e.target.name]: e.target.value}))

    const handleImageChange = e => 
    {
        const files = Array.from(e.target.files);
        setPropertyDetails((prevDetails) => ({...prevDetails,images: files}));
    };

    // Function to format the rent amount
    const formatCurrency = value =>
        new Intl.NumberFormat("en-KE", 
        {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 2,
        }).format(value);

    const addProperty = e => 
    {
        e.preventDefault();
        console.log(propertyDetails);
    };

    return (
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">Properties owned by Samuel Muigai</h1>
            <div className="d-flex justify-content-end gap-2 p-3">
                <button className="btn btn-primary" onClick={() => setModalOpen(!isModalOpen)}>
                    <IoAddOutline className="fs-4" /> Add a new property
                </button>
            </div>
            <div className="row">
                {
                    currentProperties.map(property => 
                    <div key={property.id} className="col-12 col-md-6 col-lg-3 mb-2">
                        <div className="card h-100 border rounded shadow-sm">
                            <div className="flip-box">
                                <div className="flip-box-inner position-relative">
                                    <div className="flip-box-front">
                                        <img src={property.imgFront} className="card-img-top" alt="Home"/>
                                    </div>
                                    <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                        <img src={property.imgBack} className="card-img-top" alt="Houses"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body d-flex flex-column">
                                <p className="card-text">{property.description}</p>
                                <p className="card-text">{property.rent}</p>
                                <p className="text-muted d-flex align-items-center">
                                    <FaMapMarkerAlt /> {property.location}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Adding New Property */}
            {
                isModalOpen && (
                    <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" encType="multipart/form-data" tabIndex={1}>
                        <div className="bg-white w-75">
                            <div className="modal-header border-bottom">
                                <h5 className="modal-title">Add a new property</h5>
                                <button type="button" className="btn-close" onClick={() => 
                                {
                                    setModalOpen(!isModalOpen);
                                    setPropertyDetails(initialPropertyDetails);
                                }}
                                ></button>
                            </div>
                            <div className="modal-body row">
                                <div className="mb-3">
                                    <label className="form-label">Property Description</label>
                                    <textarea className="form-control" id="propertyDescription" name="description" value={propertyDetails.description} onChange={handleInputChange} required></textarea>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mb-3">
                                    <label className="form-label">Rent</label>
                                    <input type="range" className="form-range" id="propertyRent" name="rent" min={0} max={900000} step={500} value={propertyDetails.rent} onChange={handleInputChange} required/>
                                    <span className="mt-2">
                                        <strong>{formatCurrency(propertyDetails.rent)}</strong>
                                    </span>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mb-3">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-control" id="propertyLocation" name="location" value={propertyDetails.location} onChange={handleInputChange} required/>
                                </div>

                                {/* Multiple Image Input */}
                                <div className="col-12 mb-3">
                                    <label className="form-label">Property Images</label>
                                    <input type="file" accept="image/*" className="form-control" multiple onChange={handleImageChange}/>
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
                                <button type="button" className="btn btn-secondary" onClick={() => 
                                {
                                    setModalOpen(!isModalOpen);
                                    setPropertyDetails(initialPropertyDetails);
                                }}>Close</button>
                                <button type="submit" className="btn btn-primary" onClick={addProperty}>Add Property</button>
                            </div>
                        </div>
                    </form>
            )}

            <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(activePage - 1)}>
                    &laquo;
                    </button>
                </li>
                {[...Array(Math.ceil(properties.length / propertiesPerPage)).keys()].map((number) => (
                    <li key={number + 1} className={`page-item ${number + 1 === activePage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </button>
                    </li>
                ))}
                <li
                    className={`page-item ${
                    activePage === Math.ceil(properties.length / propertiesPerPage) ? "disabled" : ""
                    }`}
                >
                    <button className="page-link" onClick={() => handlePageChange(activePage + 1)}>
                    &raquo;
                    </button>
                </li>
                </ul>
            </nav>
        </div>
    );
};

export default Properties;
