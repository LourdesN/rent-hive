import { CircularProgress } from "@mui/material"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Swal from "sweetalert2"
import AddAdmin from "./Add Admin"

const Admins = () => 
{
    const navigate = useNavigate(-1)

    //State to store admins data
    const [admins, setAdmins] = useState([])

    //State to handle data loading state
    const [loading, setLoading] = useState(true)

    //State to handle add admin form modal
    const [openAddAdmin, setOpenAddAdmin] = useState(false)

    //State to handle edit admin form modal
    const [openEditAdmin, setOpenEditAdmin] = useState(false)

    //State to handle the admin being edited
    const [adminToEdit, setAdminToEdit] = useState({})

    //Fetching the admins
    const fetchAdmins = () =>
    {
        fetch("https://rent-hive-backend.vercel.app/admins",
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
            setAdmins(data?.admins)
            :
                toast.error(data.message)
        })
        .finally(() => setLoading(false))
    }
    
    //Triggering the useEffect once the page loads
    useEffect(() => fetchAdmins(), [])

    //Function to handle admin changes
    const editAdmin = id =>
    {
        //Getting the admin being edited from the admins state
        const admin = admins.find(admin => admin._id === id)

        //Opening the edit modal
        setOpenEditAdmin(true)

        //Setting the admin to be edited in state
        setAdminToEdit(admin)
    }

    //Function to delete admin account
    const deleteAdmin = id =>
    {
        //Getting the admin being deleted from the admins state
        const admin = admins.find(admin => admin._id === id)

        //Creating a sweet alert to notify the admin of the deletion
        Swal.fire(
        {
            title: `Are you sure you want to delete ${admin.first_name} ${admin.last_name}'s account?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then(result =>
        {
            if(result.isConfirmed)
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
                        //Update the admins state by removing the tenant whose ID has been deleted from the database
                        const remainingAdmins = admin.filter(owner => owner.id !== id)
                        setAdmins(remainingAdmins)
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
        })
    }
    return ( 
        <div className="container py-2">
            <h1 className="text-uppercase fs-2 fw-bold text-center">All system administrators</h1>
            <div className="d-flex justify-content-end mb-3 me-5">
                <button className="btn btn-primary" onClick={()=> setOpenAddAdmin(true)}>Add new admin</button>
            </div>
            <div className="overflow-x-auto p-2 px-md-5">
                <table className="table table-stripped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Name</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Email</th>
                            <th scope="col" className="text-white text-uppercase text-center bg-success">Phone Number</th>
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
                                admins.length > 0
                                ?
                                    admins.map(admin =>
                                    {
                                        return(
                                            <tr key={admin.id}>
                                                <td data-label="Name" className='text-center p-3'>{admin.first_name} {admin.last_name}</td>
                                                <td data-label="Email address" className='text-center p-3'>{admin.email}</td>
                                                <td data-label="Phone number" className='text-center p-3'>{admin.phone_number}</td>
                                                <td data-label="Propeties Listed" className='text-center p-3'>{admin.properties_listed || 0}</td>
                                                <td className='text-center p-3'>
                                                    <div className="d-flex flex-row justify-content-between border-0">
                                                        <GoPencil className="fs-5" onClick={()=> editAdmin(admin.id)}/>
                                                        <FaRegTrashAlt className="text-danger fs-5" onClick={()=> deleteAdmin(admin.id)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                :
                                    <tr>
                                        <td colSpan={5}>No admin accounts to display</td>
                                    </tr>
                        }
                    </tbody>
                </table>
            </div>
            {/* {
                editModal && <EditOwner owner={onwerToEdit} setEditModal={setEditModal} fetchOwners={fetchOwners}/>
            } */}
            {
                openAddAdmin && <AddAdmin fetchAdmins={fetchAdmins} setOpenAddModal={setOpenAddAdmin} />
            }
        </div>
     );
}
 
export default Admins;