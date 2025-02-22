import Cards from "./Cards"
import PaymentHistory from "./Payment History"
import Piechart from "./Pie chart"

const Landing = ({fullName, soon, sooner, soonest, role, properties}) => 
{
    return ( 
        <>
            <h1 className="text-uppercase fs-2 fw-bold text-center">Welcome back, {fullName}</h1>
            <Cards properties={properties}/>
            <div className="d-flex flex-column flex-md-row flex-md-nowrap justify-content-evenly p-2">
                <Piechart soon={soon} sooner={sooner} soonest={soonest}/>
                <PaymentHistory/>
            </div>
        </>
    )
}
 
export default Landing