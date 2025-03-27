/* eslint-disable react-hooks/exhaustive-deps */
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { CiCamera } from "react-icons/ci"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import UploadImage from "./Image update"

const Profile = () => 
{
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({})
    const [loading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // State to control the upload profile image
    const [imageModal, setImageModal] = useState(null)

    // State to handle password visibility
    const [passwordVisibility, setPasswordVisibility] = useState(
    {
        current: false,
        new: false,
        confirm: false,
    })

    // State to handle password update
    const [password, setPassword] = useState(
    {
        current_password: "",
        new_password: "",
        confirm_password: "",
    })

    // State for password validation checks
    const [passwordChecks, setPasswordChecks] = useState(
    {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
    })

    // Function to toggle password visibility
    const togglePasswordVisibility = field => setPasswordVisibility((prevState) => ({ ...prevState,[field]: !prevState[field]}))

    const handleInputChange = e => 
    {
        setPassword({ ...password, [e.target.id]: e.target.value })

        if (e.target.id === "new_password") 
        {
            // Update password checks
            setPasswordChecks({
                length: e.target.value.length >= 10,
                lowercase: /[a-z]/.test(e.target.value),
                uppercase: /[A-Z]/.test(e.target.value),
                number: /\d/.test(e.target.value),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(e.target.value),
            })
        }

        // Clear error message when the user starts typing
        if (errorMessage) setErrorMessage("")
    }

    //Function to fetch user details
    const getUserDetails =  () =>
    {
        fetch("https://rent-hive-backend.vercel.app/profile", 
        {
            method: "GET",
            headers: 
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID"),
            },
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
        .finally(() => setIsLoading(false))
    }

    useEffect(() => getUserDetails(), [])

    const updatePassword = e => 
    {
        e.preventDefault()
        setIsSubmitting(true)
        const { length, lowercase, uppercase, number, specialChar } = passwordChecks

        if (!length || !lowercase || !uppercase || !number || !specialChar) 
        {
            setErrorMessage(
                "Password must be at least 10 characters long and contain at least one lowercase letter, one uppercase letter, and one number."
            )
        }
        else
        {
            setIsSubmitting(true)
            fetch("https://rent-hive-backend.vercel.app/profile",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    "X-Session-ID": localStorage.getItem("X-Session-ID")
                },
                body: JSON.stringify(password)
            })
            .then(response => response.json())
            .then(data =>
            {
                data.type === "success"
                ?
                    toast.success(data.message,
                    {
                        onClose: () => setPassword({current_password: "",new_password: "",confirm_password: ""})
                    })
                :
                    toast.error(data.message)
            })
            .finally(()=> 
            {
                setIsSubmitting(false)
                getUserDetails()
            })
        }
    }

    return (
        <div className="container p-4 w-75">
            <div className="d-flex justify-content-center align-items-center gap-4 pb-3">
                <div className="position-relative p-3 rounded">
                    <img src={`${userDetails.profile_picture ? `https://mobikey-lms.s3.amazonaws.com/images/${userDetails.profile_picture}` : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&size=200"}`} alt={loading ? "Loading..." : `${userDetails.first_name} ${userDetails.last_name}'s profile image`}  className="rounded-circle" width="100" height="100" style={{objectFit: "contain"}}/>
                    <button className="btn btn-light position-absolute bottom-0 end-0 p-1 border rounded-circle">
                        <CiCamera className="text-dark fs-5" onClick={() => setImageModal(true)} />
                    </button>
                </div>
                <div>
                    <h4 className="border-bottom p-1">User details</h4>
                    <p className="mb-1">Name: {loading ? "Loading..." : `${userDetails.first_name} ${userDetails.last_name}`}</p>
                    <p className="mb-1">Email: {loading ? "Loading..." : userDetails.email}</p>
                    <p className="mb-1">Phone number: {loading ? "Loading..." : userDetails.phone_number}</p>
                    <p className="mb-1">
                        Role: {loading ? "Loading..." : userDetails.role === "Owner" ? "Home Owner" : userDetails.role === "Tenant" ? "Tenant" : ""}
                    </p>
                </div>
            </div>

            {/* Change password section */}
            <div className="mt-4">
                <h5 className="text-center text-decoration-underline pb-2">Change password</h5>
                <form className="row" onSubmit={updatePassword}>

                    {/* Current Password */}
                    <div className="col-md-4 position-relative">
                        <label className="form-label">Current password</label>
                        <input type={passwordVisibility.current ? "text" : "password"} id="current_password" className="form-control" value={password.current_password} onChange={handleInputChange} placeholder="Enter your current password" required/>
                        <button type="button" className="btn position-absolute end-0 translate-middle-y me-2 border-0 bg-transparent" style={{top: "70%"}} onClick={() => togglePasswordVisibility("current")}>
                            {
                                passwordVisibility.current 
                                ? 
                                    <FaEyeSlash className="text-secondary" /> 
                                : 
                                    <FaEye className="text-secondary" />}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="col-md-4 position-relative">
                        <label className="form-label">New password</label>
                        <input type={passwordVisibility.new ? "text" : "password"} id="new_password" className="form-control" value={password.new_password} onChange={handleInputChange} placeholder="Enter your new password" required/>
                        <button type="button" className="btn position-absolute end-0 translate-middle-y me-2 border-0 bg-transparent" style={{top: "70%"}} onClick={() => togglePasswordVisibility("new")}>
                            {
                                passwordVisibility.new 
                                ? 
                                    <FaEyeSlash className="text-secondary" /> 
                                : 
                                    <FaEye className="text-secondary" />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-4 position-relative">
                        <label className="form-label">Confirm password</label>
                        <input type={passwordVisibility.confirm ? "text" : "password"} id="confirm_password" className="form-control" value={password.confirm_password} onChange={handleInputChange} placeholder="Confirm your new password" required/>
                        <button type="button" className="btn position-absolute end-0 translate-middle-y me-2 border-0 bg-transparent" style={{top: "70%"}}  onClick={() => togglePasswordVisibility("confirm")}>
                            {
                                passwordVisibility.confirm 
                                ? 
                                    <FaEyeSlash className="text-secondary" /> 
                                : 
                                    <FaEye className="text-secondary" />
                            }
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className={`btn btn-success me-2 ${isSubmitting ? "disabled" : ""}`}>
                            {
                                isSubmitting 
                                ? 
                                    "Saving changes" 
                                :
                                    "Save"
                            }
                        </button>
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
            {imageModal && <UploadImage setImageModal={setImageModal} getUserDetails={getUserDetails}/>}
        </div>
    )
}

export default Profile
