import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaMapMarkerAlt } from "react-icons/fa"
import {formatCurrency} from "../../Calculations/Format Currency"

import Loader from "../../../Assets/Components/Loader"
import Carousel from "../../Components/Carousel"

import House from "../../../Assets/Images/houses.jpeg"
import Home from "../../../Assets/Images/home.jpeg"

const Leases = ({fullName}) => 
{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const sampleData = 
    [
        {
            id: 1,
            propertyName: "Bella Heights Estate",
            location: "Kiambu, Kiambu County, Kenya",
            rent: 45000,
            lease_start_date: "2025-02-01",
            lease_period: "12 months",
            images: [
                House,
                Home
            ]
        }
    ]

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
                            sampleData.length === 0
                            ?
                                <div className="d-flex flex-column align-items-center justify-content-center w-100 my-5">
                                    <h4 className="text-muted mt-3">No available properties</h4>
                                </div>
                            :
                                sampleData?.map(data =>
                                {
                                    return(
                                        <div key={data.id} className="col-12 col-md-6 col-lg-3 mb-2">
                                            <div className="card h-100 border rounded shadow-sm overflow-hidden">
                                                <Carousel images={data.images}/>
                                                <div className="card-body d-flex flex-column">
                                                    <p className="card-text fw-bold text-uppercase">{data.propertyName}</p>
                                                    <p className="card-text"><FaMapMarkerAlt/> {data.location}</p>
                                                    <p className="card-text">Rent per month: <b>{formatCurrency(data.rent)}</b></p>
                                                    <p className="card-text">Lease start date: {data.lease_start_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                        }
                    </div>
            }
        </div>
     )
}
 
export default Leases