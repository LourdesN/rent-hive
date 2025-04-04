import { useState } from "react"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const AddTenant = ({ fetchTenants, setAddModal }) => 
{
    const navigate = useNavigate()

    //Initial form state
    const intialState = 
    {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "Tenant"
    }

    //State to handle tenant details
    const [tenant, setTenant] = useState({...intialState})
    
    //State to handle form submission
    const [isSubmitting, setIsSubmitting] = useState(false)

    //State for the phone number validation error(s)
    const [phoneError, setPhoneError] = useState('')

    //Function to handle form input changes
    const handleInputChange = e => setTenant({...tenant, [e.target.name] : e.target.value})

    //Function to handle phone number input changes
    const handlePhoneNumberChange = value =>
    {
        setTenant({...tenant, phone_number: value})
        if(value && !isValidPhoneNumber(value))
        {
            setPhoneError("Invalid phone number")
        }
        else
        {
            setPhoneError("")
        }
    }

    //Function to handle account creation
    const createAccount = e =>
    {
        e.preventDefault()

        //Validating the phone number before submission
        if(!tenant.phone_number || !isValidPhoneNumber(tenant.phone_number))
        {
            setPhoneError("Invalid phone number")
            return ;
        }

        setIsSubmitting(true)
        console.log(tenant)
        fetch("https://rent-hive-backend.vercel.app/tenants",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
            body: JSON.stringify(tenant)
        })
        .then(response => response.json())
        .then(data =>
        {
            if(data.type === "success")
            {
                toast.success(data.message)

                //Closing the add modal form
                setAddModal(false)

                //Clearing the tenant state
                setTenant({...intialState})

                //Triggering the tenants fetch
                fetchTenants()
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
        <form className="modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-50" onSubmit={createAccount}>
            <div className="bg-white w-50">
                <div className="modal-header border-bottom">
                    <h5 className="modal-title">Add a new tenant</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => { setAddModal(false) }}></button>
                </div>
                <div className="modal-body row">
                    <div className="col-12 col-md-6">
                        <label className="form-label">First Name: <span className="text-danger fs-5">*</span></label>
                        <input type="text" className="form-control" name="first_name" placeholder="e.g., John" value={tenant.first_name} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Last Name: <span className="text-danger fs-5">*</span></label>
                        <input type="text" className="form-control" name="last_name" placeholder="e.g., Doe" value={tenant.last_name} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Email: <span className="text-danger fs-5">*</span></label>
                        <input type="email" className="form-control" name="email" placeholder="e.g., johndoe@example.com" value={tenant.email} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Phone Number: <span className="text-danger fs-5">*</span></label>
                        <PhoneInput international initialValueFormat="national" defaultCountry={"KE"} value={tenant.phone_number} onChange={handlePhoneNumberChange} required/>
                        {phoneError && <p className="text-danger text-center">{phoneError}</p>}
                    </div>
                </div>
                <div className="modal-footer border-top">
                    <button type="button" className={`btn btn-secondary ${isSubmitting ? "disabled" : ""}`} onClick={() => { setAddModal(false) }}>Cancel</button>
                    <button type="submit" className={`btn btn-primary ${isSubmitting ? "disabled" : " "}`}>
                        {
                            isSubmitting
                            ?
                                "Creating account..."
                            :
                                "Create account"
                        }
                    </button>
                </div>
            </div>
        </form>
    );
}
 
export default AddTenant;