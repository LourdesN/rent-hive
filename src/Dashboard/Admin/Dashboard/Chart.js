import {PieChart} from "@mui/x-charts/PieChart"

const PropertiesChart = ({occupied, vacant}) => 
{
    const values=
    {
        occupied: occupied,
        vacant: vacant,
    }
    const data =
    [
        {id: 0, value: values.vacant, label: "Vacant", color: "#FF0000"},
        {id: 1, value: values.occupied, label: "Occupied", color: "#800000"},
    ]
    return ( 
        <div className="w-100">
            <h1 className="text-uppercase fs-3 fw-bold p-2 text-center">Properties breakdown</h1>
            <div className="d-flex justify-content-start">
                <PieChart series={[{data: data, outerRadius: 100, startAngle: -90, endAngle: 90}]} width={400} height={200}/>
            </div>
        </div>
    )
}
 
export default PropertiesChart