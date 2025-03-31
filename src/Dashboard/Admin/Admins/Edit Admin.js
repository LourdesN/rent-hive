import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditAdmin = ({ admin, setOpenEditModal, fetchAdmins }) => 
{
    const navigate = useNavigate()
    //State to handle form submission
    const [isSubmitting, setIsSubmitting] = useState(false)

    //State to store a copy of the owner details
    const [adminDetails, setAdminDetails] = useState({...admin})

    //Function to handle form input change
    const handleInputChange = e =>
    {
        //Update the state with the new value
        setAdminDetails({...adminDetails, [e.target.name]: e.target.value})
    }

    //Function to handle form submission
    const updateAdminDetails = e =>
    {
        e.preventDefault()
        setIsSubmitting(true)
        fetch(`https://rent-hive-backend.vercel.app/owners/${adminDetails.id}`,
        {
            method: "PATCH",
            headers:
            {
                "Content-Type": "application/json",
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
            body: JSON.stringify(adminDetails)
        })
        .then(response => response.json())
        .then(data =>
        {
            if(data.type === "success")
            {
                //Closing the add modal form
                setOpenEditModal(false) 

                toast.success(data.message)
                fetchAdmins()
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
        .finally(()=> setIsSubmitting(false))
    }

    return ( 
        <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" onSubmit={updateAdminDetails}>
            <div className="bg-white w-50">
                <div className="modal-header border-bottom">
                    <h5 className="modal-title">Edit {adminDetails.first_name} {adminDetails.last_name}'s details</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => { setOpenEditModal(false) }}></button>
                </div>
                <div className="modal-body row">
                    <div className="col-md-6">
                        <label className="form-label">First Name:</label>
                        <input type="text" className="form-control" defaultValue={adminDetails.first_name} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name:</label>
                        <input type="text" className="form-control" defaultValue={adminDetails.last_name} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" defaultValue={adminDetails.email} onChange={handleInputChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone number:</label>
                        <input type="text" className="form-control" name="phone_number" defaultValue={adminDetails.phone_number} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="modal-footer border-top">
                    <button type="button" className={`btn btn-secondary ${isSubmitting ? "disabled" : ""}`} onClick={() => { setOpenEditModal(false) }}>Cancel</button>
                    <button type="submit" className={`btn btn-primary ${isSubmitting ? "disabled" : " "}`}>
                        {
                            isSubmitting
                            ?
                                "Saving changes..."
                            :
                                "Save changes"
                        }
                    </button>
                </div>
            </div>
        </form>
     );
}
 
export default EditAdmin;