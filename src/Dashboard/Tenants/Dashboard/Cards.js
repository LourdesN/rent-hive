import { BiBuildingHouse } from "react-icons/bi";
import { PiUsersBold } from "react-icons/pi";

import { formatCurrency } from "../../Calculations/Format Currency";

const Cards = ({ rentDue, leasedProperties}) => 
{
    return (
        <div className="container-fluid px-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                {/* First Card - Rent due */}
                <div className="col">
                    <div className="stat-card">
                        <div className="card-body">
                            <div>
                                <h2>Rent due</h2>
                                <p className="stat">{formatCurrency(rentDue)}</p>
                            </div>
                            <div className="icon">
                                <BiBuildingHouse />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Card - Leased properties */}
                <div className="col">
                    <div className="stat-card">
                        <div className="card-body">
                            <div>
                                <h2>Leased properties</h2>
                                <p className="stat">{leasedProperties}</p>
                            </div>
                            <div className="icon">
                                <PiUsersBold />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
