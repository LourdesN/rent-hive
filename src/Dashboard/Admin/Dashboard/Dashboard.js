import { FaCity } from "react-icons/fa"
import { MdPeople, MdGroups } from "react-icons/md";
import PropertiesChart from "./Chart";
import TransactionHistory from "./Transactions";

const AdminDashboard = ({ fullName, totalTenants, totalOwners, totalProperties, occupied, vacant }) => 
{
    
    return ( 
        <>
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
                <div className="d-flex flex-column flex-md-row flex-md-nowrap justify-content-evenly p-2">
                    <PropertiesChart occupied={occupied} vacant={vacant}/>
                    <TransactionHistory/>
                </div>
            </div>
        </>
     );
}
 
export default AdminDashboard;