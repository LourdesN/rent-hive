import { BiBuildingHouse } from "react-icons/bi";
import { PiUsersBold } from "react-icons/pi";

import PaymentsReceived from "./Payments Done"
import ExpiringLeases from "./Expiring Leases";

const OwnerDashboard = ({ fullName, totalProperties, totalTenants, vacantProperties, rentedProperties, soon, sooner, soonest }) => 
{
    return ( 
        <>
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
                <div className="d-flex flex-column flex-md-row flex-md-nowrap justify-content-evenly p-2">
                    <ExpiringLeases soon={soon} sooner={sooner} soonest={soonest}/>
                    <PaymentsReceived/>
                </div>
            </div>

            
        </>
     );
}
 
export default OwnerDashboard;