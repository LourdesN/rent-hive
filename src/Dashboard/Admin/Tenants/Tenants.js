import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Tenants = () => 
{
    const [tenants, setTenants] = useState([])

    //Fetching the tenant details from the backend
    const fetchTenants = () =>
    {
        fetch("https://rent-hive-backend.vercel.app/tenants",
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
            data.type === "success"
            ?
                setTenants(data?.tenants)
            :
                toast.error(data.message)
        })
    }

    useEffect(()=> fetchTenants(),[])
    return ( 
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">All tenants</h1>
            <div className="d-flex justify-content-end mb-2 me-5">
                <button className="btn btn-primary">Add new tenant</button>
            </div>
            <div className="overflow-x-auto p-2 px-md-5">
                <table className="table table-stripped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Name</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Email</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Phone Number</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Properties leased</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenants?.map(tenant =>
                            {
                                return(
                                    <tr key={tenant.id}>
                                        <td data-label="Name" className='text-center p-3'>{tenant?.first_name} {tenant?.last_name}</td>
                                        <td data-label="Email address" className='text-center p-3'>{tenant?.email}</td>
                                        <td data-label="Phone number" className='text-center p-3'>{tenant?.phone_number}</td>
                                        <td data-label="Propeties leased" className='text-center p-3'>{tenant?.properties_leased || 0}</td>
                                        <td className='text-center p-3'>
                                            <div className="d-flex flex-row justify-content-between border-0">
                                                <GoPencil className="fs-5"/>
                                                <FaRegTrashAlt className="text-danger fs-5"/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
 
export default Tenants;