import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import AddTenant from "./Add Tenant"
import EditTenant from "./Edit Tenant"

const Tenants = () => 
{
    const navigate = useNavigate()
    //State to store the data loading state
    const [loading, setLoading] = useState(true)

    //State to store tenants data
    const [tenants, setTenants] = useState([])

    //State to handle the add tenant form modal
    const [addModal, setAddModal] = useState(false)

    //State to handle the edit tenant form modal
    const [editModal, setEditModal] = useState(false)

    //State to handle the owner whose details are being edited
    const [tenantToEdit, setTenantToEdit] = useState({})

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
        .finally(() => setLoading(false))
    }

    useEffect(()=> fetchTenants(),[])

    //Function to handle owner changes
    const editTenant = id =>
    {
        //Getting the owner details by ID from the owners state
        const tenant = tenants.find(owner => owner.id === id)

        setEditModal(true)
        setTenantToEdit(tenant)
    }

    //Function to delete the tenant
    const deleteTenant = id =>
    {
        console.log(id)
        fetch(`https://rent-hive-backend.vercel.app/tenants/${id}`,
        {
            method: "DELETE",
            headers:
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
        })
        .then(response => response.json())
        .then(data => 
        {
            if(data.type === "success")
            {
                toast.success(data.message)
                //Update the tenants state by removing the tenant whose ID has been deleted from the database
                const remainingTenants = tenants.filter(tenant => tenant.id !== id)
                setTenants(remainingTenants)
            }
            else
            {
                if(data.type === "error")
                {
                    toast.error(data.message)

                    if(data.reason === "Invalid credentials")
                    {
                        navigate(-1)
                    }
                }
            }
        })
    }

    return ( 
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">All tenants</h1>
            <div className="d-flex justify-content-end mb-2 me-5">
                <button className="btn btn-primary" onClick={()=> setAddModal(true)}>Add new tenant</button>
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
                            loading
                            ?
                                <tr>
                                    <td colSpan={5} className="text-center text-xl"><CircularProgress size={30}/></td>
                                </tr>
                            :
                                tenants?.length > 0
                                ?
                                tenants?.map(tenant =>
                                    {
                                        return(
                                            <tr key={tenant?.id}>
                                                <td data-label="Name" className='text-center p-3'>{tenant?.first_name} {tenant?.last_name}</td>
                                                <td data-label="Email address" className='text-center p-3'>{tenant?.email}</td>
                                                <td data-label="Phone number" className='text-center p-3'>{tenant?.phone_number}</td>
                                                <td data-label="Propeties leased" className='text-center p-3'>{tenant?.properties_leased || 0}</td>
                                                <td className='text-center p-3'>
                                                    <div className="d-flex flex-row justify-content-between border-0">
                                                        <GoPencil className="fs-5" onClick={()=> editTenant(tenant?.id)}/>
                                                        <FaRegTrashAlt className="text-danger fs-5" onClick={()=> deleteTenant(tenant?.id)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                    <tr>
                                        <td colSpan={5}>No tenants to display</td>
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>
            {
                addModal && <AddTenant fetchTenants={fetchTenants} setAddModal={setAddModal}/>
            }
            {
                editModal && <EditTenant tenant={tenantToEdit} setEditModal={setEditModal} fetchTenants={fetchTenants}/>
            }
        </div>
    )
}
 
export default Tenants;