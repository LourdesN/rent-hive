import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { toast } from "react-toastify"
const Owners = () => 
{
    const [owners, setOwners] = useState([])

    //Fetching the tenant details from the backend
    const fetchOwners = () =>
    {
        fetch("https://rent-hive-backend.vercel.app/owners",
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
            setOwners(data?.owners)
            :
                toast.error(data.message)
        })
    }
    
    useEffect(()=> fetchOwners(),[])

    return ( 
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">All home owners</h1>
            <div className="d-flex justify-content-end mb-3 me-5">
                <button className="btn btn-primary">Add new owner</button>
            </div>
            <div className="overflow-x-auto p-2 px-md-5">
                <table className="table table-stripped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Name</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Email</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Phone Number</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Properties listed</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            owners.length > 0
                            ?
                                owners.map(owner =>
                                {
                                    return(
                                        <tr key={owner.id}>
                                            <td data-label="Name" className='text-center p-3'>{owner.first_name} {owner.last_name}</td>
                                            <td data-label="Email address" className='text-center p-3'>{owner.email}</td>
                                            <td data-label="Phone number" className='text-center p-3'>{owner.phone_number}</td>
                                            <td data-label="Propeties Listed" className='text-center p-3'>{owner.properties_listed || 0}</td>
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
                            :
                                <tr>
                                    <td colSpan={5}>No home owners to display</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
 
export default Owners