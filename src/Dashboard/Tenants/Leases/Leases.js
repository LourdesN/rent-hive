import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaMapMarkerAlt } from "react-icons/fa"
import {formatCurrency} from "../../Calculations/Format Currency"
import { toast } from "react-toastify"

import Loader from "../../../Assets/Components/Loader"
import Carousel from "../../Components/Carousel"

const Leases = ({fullName}) => 
{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [leases, setLeases] = useState([])

    useEffect(()=>
    {
        setLoading(true)

        fetch("https://rent-hive-backend.vercel.app/lease",
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
                        onClose: ()=> navigate(-1)
                    })
                :
                    toast.error(data.message)
            :
                    setLeases(data?.leases)
        })
        .finally(()=> setLoading(false))
    },[navigate])

    return ( 
        <div className="container mt-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center mb-2">{fullName}'s Leases</h1>
            {
                loading
                ?
                    <Loader/>
                :
                    <div className="row">
                        {
                            leases?.length === 0
                            ?
                                <div className="d-flex flex-column align-items-center justify-content-center w-100 my-5 p-2">
                                    <h4 className="text-muted mt-3">No leases available</h4>
                                    <Link to="/dashboard/available-properties" className="btn btn-primary">Click here to see the list of available properties</Link>
                                </div>
                            :
                                leases?.map(lease =>
                                {
                                    return(
                                        <div key={lease.id} className="col-12 col-md-6 col-lg-3 mb-2">
                                            <div className="card h-100 border rounded shadow-sm overflow-hidden">
                                                <Carousel images={lease.property.images}/>
                                                <div className="card-body d-flex flex-column">
                                                    <p className="card-text fw-bold text-uppercase">{lease.property.name}</p>
                                                    <p className="card-text"><FaMapMarkerAlt/> {lease.property.location}</p>
                                                    <p className="card-text">Rent per month: <b>{formatCurrency(lease.rent_amount)}</b></p>
                                                    <p className="card-text">Lease start date: {lease.start_date}</p>
                                                </div>
                                                <Link to={`/dashboard/leases/${lease.id}`} className="btn btn-primary mx-2 mb-2">View lease details</Link>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
            }
        </div>
     )
}
 
export default Leases