import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { toast } from "react-toastify"
import EditOwner from "./Edit Owner"
import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import AddOwner from "./Add Owner"

const Owners = () => 
{
    const navigate = useNavigate(-1)
    //State to store the data loading state
    const [loading, setLoading] = useState(true)

    //State to store the owner details
    const [owners, setOwners] = useState([])

    //State to handle the edit form modal
    const [editModal, setEditModal] = useState(false)

    //State to handle the add owner form modal
    const [addModal, setAddModal] = useState(false)

    //State to handle the owner whose details are being edited
    const [onwerToEdit, setOwnerToEdit] = useState({})

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
        .finally(() => setLoading(false))
    }
    
    useEffect(()=> fetchOwners(),[])

    //Function to handle owner changes
    const editOwner = id =>
    {
        //Getting the owner details by ID from the owners state
        const owner = owners.find(owner => owner.id === id)

        setEditModal(true)
        setOwnerToEdit(owner)
    }

    //Function to delete the owner
    const deleteOwner = id =>
    {
        fetch(`https://rent-hive-backend.vercel.app/owners/${id}`,
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
                const remainingOwners = owners.filter(owner => owner.id !== id)
                setOwners(remainingOwners)
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
            <h1 className="text-uppercase fs-2 fw-bold text-center">All home owners</h1>
            <div className="d-flex justify-content-end mb-3 me-5">
                <button className="btn btn-primary" onClick={()=> setAddModal(true)}>Add new owner</button>
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
                            loading
                            ?
                                <tr>
                                    <td colSpan={5} className="text-center"><CircularProgress size={30}/></td>
                                </tr>
                            :
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
                                                        <GoPencil className="fs-5" onClick={()=> editOwner(owner.id)}/>
                                                        <FaRegTrashAlt className="text-danger fs-5" onClick={()=> deleteOwner(owner.id)}/>
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
            {
                editModal && <EditOwner owner={onwerToEdit} setEditModal={setEditModal}/>
            }
            {
                addModal && <AddOwner owners={owners} setOwners={setOwners} setAddModal={setAddModal} />
            }
        </div>
    )
}
 
export default Owners