import { useState } from "react"
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

const SignUp = () => 
{
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility]=useState(false)
    const [phoneError, setPhoneError] = useState('')
    const [signUpDetails, setSignUpDetails]=useState(
        {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            confirm_password: ""

        }
    )

    const handleInputChange = e => setSignUpDetails({ ...signUpDetails, [e.target.id]: e.target.value })
    const handlePhoneNumberChange = value =>
    {
        setSignUpDetails({...signUpDetails, phone: value})
        if(value && !isValidPhoneNumber(value))
        {
            setPhoneError("Invalid phone number")
        }
        else
        {
            setPhoneError("")
        }
    }
    const togglePasswordVisibility = () => setPasswordVisibility((prevState) => !prevState)
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisibility((prevState) => !prevState)

    const signup = e =>
    {
        e.preventDefault()
        console.log(signUpDetails)
    }

    return (
        <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center login-backgound">
            <div className="card p-4 w-50">
                <h3 className="text-center mb-4">Sign Up</h3>
                <form className="row g-3" onSubmit={signup}>
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" value={signUpDetails.first_name} onChange={handleInputChange} placeholder="Enter your first name" required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" value={signUpDetails.last_name} onChange={handleInputChange} placeholder="Enter your last name" required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={signUpDetails.email} onChange={handleInputChange} placeholder="Enter your email" required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <PhoneInput international initialValueFormat="national" defaultCountry={"KE"} value={signUpDetails.phone} onChange={handlePhoneNumberChange} required/>
                        {phoneError && <p className="text-danger text-center">{phoneError}</p>}
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select id="role" className="form-select" value={signUpDetails.role} onChange={handleInputChange} required>
                            <option value="">Select your role</option>
                            <option value="Tenant">Tenant</option>
                            <option value="Owner">Home Owner</option>
                        </select>
                    </div>
                    <div className="col-md-6 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={passwordVisibility ? "text" : "password"} id="password" value={signUpDetails.password} onChange={handleInputChange} className="form-control" placeholder="Password" required/>
                        <span className="position-absolute end-0 password-icon translate-middle-y me-3 cursor-pointer" onClick={togglePasswordVisibility}
                        title={passwordVisibility ? "Hide password" : "Show password"}>
                            {
                            passwordVisibility
                            ? 
                                <FaEyeSlash /> 
                            : 
                                <FaEye />
                            }
                        </span>
                    </div>
                    <div className="col-md-6 position-relative">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type={confirmPasswordVisibility ? "text" : "password"} id="confirm_password" value={signUpDetails.confirm_password} onChange={handleInputChange} className="form-control" placeholder="Password" required/>
                        <span className="position-absolute end-0 password-icon translate-middle-y me-3 cursor-pointer" onClick={toggleConfirmPasswordVisibility}
                        title={confirmPasswordVisibility ? "Hide password" : "Show password"}>
                            {
                            confirmPasswordVisibility
                            ? 
                                <FaEyeSlash /> 
                            : 
                                <FaEye />
                            }
                        </span>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary px-4">Sign Up</button>
                    </div>
                    <Link to="/login" className="d-flex justify-content-end">Already have an account? </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
