import { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa"
import { MdPeople, MdGroups } from "react-icons/md";
import Loader from "../../../Assets/Components/Loader";

const AdminDashboard = ({ fullName }) => 
{
    //State to store the total number of tenants, owners and properties
    const [totalTenants, setTotalTenants] = useState(0)
    const [totalOwners, setTotalOwners] = useState(0)
    const [totalProperties, setTotalProperties] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

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
                setTotalOwners(data?.owners)
                setTotalTenants(data?.tenants)
                setTotalProperties(data?.properties)
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
            <div className="container-fluid px-4 py-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                    {/* Owners card */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>Home Owners</h2>
                                    <p className="stat">{totalOwners}</p>
                                </div>
                                <div className="icon">
                                    <MdGroups />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tenants card */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>Tenants</h2>
                                    <p className="stat">{totalTenants}</p>
                                </div>
                                <div className="icon">
                                    <MdPeople />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Properties card */}
                    <div className="col">
                        <div className="stat-card">
                            <div className="card-body">
                                <div>
                                    <h2>Properties</h2>
                                    <p className="stat">{totalProperties}</p>
                                </div>
                                <div className="icon">
                                    <FaCity />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AdminDashboard;