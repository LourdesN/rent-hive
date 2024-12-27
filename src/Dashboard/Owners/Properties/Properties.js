import { IoAddOutline } from "react-icons/io5"
import { FaMapMarkerAlt } from "react-icons/fa"
import Home from "../../../Assets/Images/home.jpeg"
import Houses from "../../../Assets/Images/houses.jpeg"
import { useState } from "react"

const Properties = () => 
{
    const [activePage, setActivePage] = useState(1)
    const propertiesPerPage = 4
    const properties = [
        {
            id: 1,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 54,000 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 2,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 54,000 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 3,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 54,000 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 4,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 21 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 5,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 540 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 6,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 540 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 7,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 540 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        {
            id: 8,
            imgFront: Home,
            imgBack: Houses,
            description: "This is a 2-bedroom master ensuite for rent in the suburbs of Kiambu with ample parking space.",
            rent: "Ksh. 540 plus Ksh. 6,000 service charge per month. TOTAL = KSH. 60,000",
            location: "Kiambu Road, Kenya"
        },
        // Add more properties as needed
    ]

    const indexOfLastProperty = activePage * propertiesPerPage
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty)

    const handlePageChange = pageNumber => setActivePage(pageNumber)

    return (
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">Properties owned by Samuel Muigai</h1>
            <div className="d-flex justify-content-end gap-2 p-3">
                <button className="btn btn-primary"><IoAddOutline className="fs-4"/> Add a new property</button>
            </div>
            <div className="row">
                {currentProperties.map(property => (
                    <div key={property.id} className="col-12 col-md-6 col-lg-3 mb-2">
                        <div className="card h-100 border rounded shadow-sm">
                            <div className="flip-box">
                                <div className="flip-box-inner position-relative">
                                    <div className="flip-box-front">
                                        <img src={property.imgFront} className="card-img-top" alt="Home" />
                                    </div>
                                    <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                        <img src={property.imgBack} className="card-img-top" alt="Houses" />
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
                ))}
            </div>
            <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                    <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(activePage - 1)}>&laquo;</button>
                    </li>
                    {[...Array(Math.ceil(properties.length / propertiesPerPage)).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${number + 1 === activePage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${activePage === Math.ceil(properties.length / propertiesPerPage) ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(activePage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Properties