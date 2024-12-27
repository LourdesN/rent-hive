import { BiBuildingHouse } from "react-icons/bi";
import { PiUsersBold } from "react-icons/pi";

const Cards = () => 
{
    return (
        <div className="container-fluid px-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                {/* First Card - Properties */}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <h2>Properties</h2>
                                <p className="stat">10</p>
                            </div>
                            <div className="icon">
                                <BiBuildingHouse />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Card - Tenants */}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <h2>Tenants</h2>
                                <p className="stat">5</p>
                            </div>
                            <div className="icon">
                                <PiUsersBold />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Card - Properties Listed */}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <h2>Properties breakdown</h2>
                            </div>
                        </div>

                        {/* Additional Cards - Vacant, Occupied, Expired */}
                        <div className="text-center">
                            <div className="row row-cols-md-3">
                                <div className="col">
                                    <p className="stat">8</p>
                                    <h2 className="card-title">Vacant</h2>
                                </div>
                                <div className="col">
                                    <p className="stat">10</p>
                                    <h2 className="card-title">Occupied</h2>
                                </div>
                                <div className="col">
                                    <p className="stat">2</p>
                                    <h2 className="card-title">Expired leases</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
