/* eslint-disable react-hooks/exhaustive-deps */
import { CiCamera } from "react-icons/ci";
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UploadImage from "./Image update";

const Profile = () =>
{
    const navigate=useNavigate()

    const [userDetails, setUserDetails] = useState({})
    const [loading, setIsLoading] = useState(true)

    //State to control the upload profile image
    const [imageModal, setImageModal] = useState(null)
    
    useEffect(()=>
    {
        fetch("https://rent-hive-backend.vercel.app/profile",
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
            const responseObject = data[0]

            responseObject.type === "error"
            ?
                responseObject.reason === "Not found" || responseObject.reason === "Invalid credentials"
                ?
                    toast.error(responseObject.message, { onClose: () => navigate(-1) })
                :
                    toast.error(responseObject.message)
            :
                setUserDetails(responseObject.user_details)
        })
        .finally(()=> setIsLoading(false))
    },[])
    
    return(
        <div className="container p-4">
            <div className="d-flex justify-content-center align-items-center gap-4 pb-3">
                <div className="position-relative p-3 rounded">
                    <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&size=200" alt={loading ? "Loading..." : `${userDetails.first_name} ${userDetails.last_name}'s profile image`} className="rounded-circle" width="100" height="100"/>
                    <button className="btn btn-light position-absolute bottom-0 end-0 p-1 border rounded-circle">
                        <CiCamera className="text-dark fs-5" onClick={()=> setImageModal(true)}/>
                    </button>
                </div>
                <div>
                    <h4 className="border-bottom p-1">User details</h4>
                    <p className="mb-1">Name: {loading ? "Loading..." : `${userDetails.first_name} ${userDetails.last_name}`}</p>
                    <p className="mb-1">Email: {loading ? "Loading..." : userDetails.email}</p>
                    <p className="mb-1">Phone number: {loading ? "Loading..." : userDetails.phone_number}</p>
                    <p className="mb-1">Role: {loading ? "Loading..." : (userDetails.role === "Owner" ? "Home Owner" : userDetails.role ==="Tenant" ? "Tenant" : "")}</p>
                </div>
            </div>

            {/* Change password section */}
            <div className="mt-4">
                <h5 className="text-center text-decoration-underline pb-2">Change password</h5>
                <form className="row">
                    <div className="col-md-4">
                        <label className="form-label">Current password</label>
                        <input type="password" name="current_password" className="form-control" required></input>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">New password</label>
                        <input type="password" name="new_password" className="form-control" required></input>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Confirm password</label>
                        <input type="password" name="confirm_password" className="form-control" required></input>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-success me-2">Save</button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
            {
                imageModal && <UploadImage setImageModal={setImageModal}/>
            }
        </div>
    )
}

export default Profile