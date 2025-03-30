import Cards from "./Cards"
import PaymentHistory from "./Payment History"
import Piechart from "./Pie chart"

const TenantDashboard = ({fullName, soonest, sooner, soon, rentDue, leasedProperties}) => 
{
    return ( 
        <>
            <h1 className="text-uppercase fs-2 fw-bold text-center">Welcome back, {fullName}</h1>
            <Cards rentDue={rentDue} leasedProperties={leasedProperties}/>
            <div className="d-flex flex-column flex-md-row flex-md-nowrap justify-content-evenly p-2">
                <Piechart soon={soon} sooner={sooner} soonest={soonest}/>
                <PaymentHistory/>
            </div>
        </>
    )
}
 
export default TenantDashboard