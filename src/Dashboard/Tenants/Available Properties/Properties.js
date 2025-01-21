/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import Loader from "../../../Assets/Components/Loader"
import { Link, useNavigate } from "react-router-dom"

const AvailableProperties = () => 
{
    const navigate = useNavigate()
    const [loading, setLoading]=useState(false)
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [locationResults, setLocationResults] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState(
    {
        location: "",
        property: "",
        rent: 0,
    })

    const fetchProperties = () =>
    {
        setLoading(true)
        fetch("https://rent-hive-backend.vercel.app/available-properties",
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

    const handleInputChange = e => 
    {
        setFilters((prevDetails) => ({...prevDetails,[e.target.name]: e.target.value,}))
        if (e.target.name === "location") 
        {
            fetchLocationSuggestions(e.target.value)
        }
    }

    const fetchLocationSuggestions = async query => 
    {
        if (query.length > 2) 
        {
            try 
            {
                const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=u6yB4aVuy7TirPp2UQFLMg-xe1NnafnrcN2w9klsclU&limit=5`)
                if (!response.ok) 
                {
                    throw new Error("Network response was not ok")
                }
                const data = await response.json()
                setLocationResults(data.items.map((item) => ({label: `${item.address.label}, ${item.address.countryName}`,position: item.position,})))
            } 
            catch (error) 
            {
                toast.error("Error fetching location:", error)
                setLocationResults([])
            }
        } 
        else 
        {
            setLocationResults([])
        }
    }

    // Filter properties based on user input
    useEffect(() => 
    {
        const filtered = properties.filter(property => 
        {
            return (
                (filters.location === "" || property.location.includes(filters.location)) &&
                (filters.property === "" || property.type === filters.property) &&
                (filters.rent === 0 || property.rent <= filters.rent)
            )
        })
        setFilteredProperties(filtered)
    }, [filters, properties])

    const propertiesPerPage = 4

    const indexOfLastProperty = activePage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)
    
  return (
    <div className="container mt-4">
        <h1 className="text-uppercase fs-2 fw-bold text-center mb-4">List of Available Properties</h1>
        <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-4 mb-3 position-relative">
                <input type="text" name="location" id="location" placeholder="Filter by location" className="form-control p-3" value={filters.location} onChange={handleInputChange}/>
                {
                    locationResults.length > 0 && (
                    <div className="dropdown-menu show w-100 mt-1" style={{ maxHeight: "200px", overflowY: "auto" }} >
                        {
                            locationResults.map((result, index) => (
                                <button key={index} className="dropdown-item" type="button" onClick={() => 
                                    {
                                        setFilters((prev) => ({ ...prev, location: result.label }))
                                        setLocationResults([])
                                    }}>{result.label}
                                </button>
                        ))}
                    </div>
            )}
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <select name="property" className="form-select p-3" value={filters.property} onChange={handleInputChange}>
                    <option value="">Search by property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                </select>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
                <label htmlFor="rent" className="form-label fw-bold"> Max Rent: Ksh {filters.rent}</label>
                <input type="range" name="rent" id="rent" min={0} max={90000} step={1000} className="form-range" value={filters.rent} onChange={handleInputChange}/>
            </div>
        </div>

        {
            loading
            ?
                <Loader/>
            :
                <div className="row">
                    {
                        currentProperties?.length === 0
                        ?
                            <div className="d-flex flex-column align-items-center justify-content-center w-100 my-5">
                                <h4 className="text-muted mt-3">No available properties</h4>
                            </div>
                        :
                            currentProperties?.map(property =>
                            {   
                                <div key={property.id} className="col-12 col-md-6 col-lg-3 mb-2">
                                    <div className="card h-100 border rounded shadow-sm overflow-hidden">
                                        {
                                            property.images.map(image =>
                                            {
                                                <img key={image.id} src={`https://mobikey-lms.s3.amazonaws.com/${image.image_url}`} alt="Property" className="h-50 object-fit z-50"/>
                                            })
                                        }
                                        <div className="card-body d-flex flex-column">
                                            <p className="card-text">{property.description}</p>
                                            <p className="card-text">Rent per month: <b>Kshs. {property.rent}</b></p>
                                            <Link to={`/dashboard/available-properties/${property.id}`}>View property</Link>
                                        </div>
                                    </div>
                                </div>
                            })
                    }
                </div>
        }

        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setActivePage(activePage - 1)}>
                        «
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${page === activePage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setActivePage(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${activePage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setActivePage(activePage + 1)}>
                        »
                    </button>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default AvailableProperties
