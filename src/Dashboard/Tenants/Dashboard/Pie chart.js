import {PieChart} from "@mui/x-charts/PieChart"

const Piechart = ({soonest, sooner, soon}) => 
{
    const values=
    {
        soon: soon,
        sooner: sooner,
        soonest: soonest
    }

    const data =
    [
        {id: 0, value: values.soonest, label: "<30 days", color: "#FF0000"},
        {id: 1, value: values.sooner, label: "31-60 days", color: "#800000"},
        {id: 2, value: values.soon, label: "61+ days", color: "#FFFF00"}
    ]
    return ( 
        <div className="w-100">
            <h1 className="text-uppercase fs-3 fw-bold p-2 text-center">Expiring leases</h1>
            <div className="d-flex justify-content-start">
                <PieChart series={[{data: data, outerRadius: 100, startAngle: -90, endAngle: 90}]} width={400} height={200}/>
            </div>
        </div>
    );
}
 
export default Piechart;