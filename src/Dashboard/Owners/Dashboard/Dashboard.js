import { BiBuildingHouse } from "react-icons/bi";
import { PiUsersBold } from "react-icons/pi";
import { useEffect, useState } from "react";

import Loader from "../../../Assets/Components/Loader";

const OwnerDashboard = ({ fullName, properties }) => 
{
    const [isLoading, setIsLoading] = useState(true)

    //States to store the required values
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalTenants, setTotalTenants] =useState(0)
    const [vacantProperties, setVacantProperties] = useState(0)
    const [rentedProperties, setRentedProperties] = useState(0)

    //Fetching the data from the backend
    useEffect(()=>
    {
        fetch("https://rent-hive-backend.vercel.app/dashboard",
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
            if(data.type === "success")
            {
                setTotalProperties(data?.properties)
                setTotalTenants(data?.tenants)
                setVacantProperties(data?.vacant)
                setRentedProperties(data?.rented)
            }
        })
        .finally(() => setIsLoading(false))
    },[])

    return ( 
        <>
            {
                isLoading && <Loader/>
            }
            <h1 className="text-uppercase fs-2 fw-bold text-center">Welcome back, {fullName}</h1>
            <div className="container-fluid px-4">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                    {/* First Card - Properties */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>My Properties</h2>
                                    <p className="stat">{totalProperties}</p>
                                </div>
                                <div className="icon">
                                    <BiBuildingHouse />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Second Card - Tenants */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>Tenants</h2>
                                    <p className="stat">{totalTenants}</p>
                                </div>
                                <div className="icon">
                                    <PiUsersBold />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Third Card - Properties Listed */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>Properties breakdown</h2>
                                </div>
                            </div>
    
                            {/* Additional Cards - Vacant, Occupied, Expired */}
                            <div className="text-center">
                                <div className="row row-cols-md-2">
                                    <div className="col">
                                        <p className="stat">{vacantProperties}</p>
                                        <h2 className="card-title">Vacant</h2>
                                    </div>
                                    <div className="col">
                                        <p className="stat">{rentedProperties}</p>
                                        <h2 className="card-title">Occupied</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default OwnerDashboard;