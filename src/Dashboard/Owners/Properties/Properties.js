/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IoAddOutline } from "react-icons/io5"
import { FaMapMarkerAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"

import {formatCurrency} from "../../Calculations/Format Currency"

import Loader from "../../../Assets/Components/Loader"

import Carousel from "../../Components/Carousel"
import AddProperty from "./Add Property"
import EditProperty from "./Edit property"

const Properties = ({fullName}) => 
{
    const navigate = useNavigate()
    const [loading, setLoading]=useState(false)
    
    const [activePage, setActivePage] = useState(1)
    const [addModal, setAddModal] = useState(false)
    // const [editModalOpen, setEditModalOpen]=useState(false)

    //State to manage the property being edited
    const [propertyToEdit, setPropertyToEdit] = useState({})

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

    return (
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">Properties owned by {fullName}</h1>
            <div className="d-flex justify-content-end gap-2 p-3">
                <button className="btn btn-primary" onClick={() => setAddModal(!addModal)}>
                    <IoAddOutline className="fs-4" /> Add a new property
                </button>
            </div>
            {
                loading
                ?
                    <Loader/>
                :
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
                                            <Carousel images={property.images}/>    
                                            <div className="card-body d-flex flex-column">
                                                <p className="card-text">{property.name}</p>
                                                <p className="card-text">{property.description}</p>
                                                {/* <p className="card-text">Rent per month: <b>{formatCurrency(property.rent)}</b></p>
                                                <p className="text-muted d-flex align-items-center">
                                                    <FaMapMarkerAlt /> {property.location}
                                                </p> */}
                                            </div>
                                           
                                            <Link to={`/dashboard/properties/${property.id}`} className="btn btn-primary mb-3 mx-2">View property</Link>
                                        </div>
                                    </div>
                                )    
                        }
                    </div>
            }
            
            {/* Modal for Adding New Property */}
            {addModal && <AddProperty addModal={addModal} setAddModal={setAddModal} fetchProperties={fetchProperties}/>}
            
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