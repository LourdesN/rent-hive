import { useState } from "react"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AddOwner = ({ fetchOwners, setAddModal }) => 
{
    const navigate = useNavigate()

    //Initial form state
    const intialState = 
    {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "Owner"
    }
    
    //State to handle owner details
    const [owner, setOwner] = useState({...intialState})

    //State to handle form submission
    const [isSubmitting, setIsSubmitting] = useState(false)

    //State for the phone number validation error(s)
    const [phoneError, setPhoneError] = useState('')

    //Function to handle form input changes
    const handleInputChange = e => setOwner({...owner, [e.target.name] : e.target.value})

    //Function to handle phone number input changes
    const handlePhoneNumberChange = value =>
    {
        setOwner({...owner, phone_number: value})
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
        if(!owner.phone_number || !isValidPhoneNumber(owner.phone_number))
        {
            setPhoneError("Invalid phone number")
            return ;
        }

        setIsSubmitting(true)
        console.log(owner)
        fetch("https://rent-hive-backend.vercel.app/owners",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
            body: JSON.stringify(owner)
        })
        .then(response => response.json())
        .then(data =>
        {
            if(data.type === "success")
            {
                toast.success(data.message)

                //Closing the add modal form
                setAddModal(false)

                //Clearing the owner state
                setOwner({...intialState})

                //Triggering a fetch of the owners
                fetchOwners()
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
                    <h5 className="modal-title">Add a new home owner</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => { setAddModal(false) }}></button>
                </div>
                <div className="modal-body row">
                    <div className="col-12 col-md-6">
                        <label className="form-label">First Name: <span className="text-danger fs-5">*</span></label>
                        <input type="text" className="form-control" name="first_name" placeholder="e.g., John" value={owner.first_name} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Last Name: <span className="text-danger fs-5">*</span></label>
                        <input type="text" className="form-control" name="last_name" placeholder="e.g., Doe" value={owner.last_name} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Email: <span className="text-danger fs-5">*</span></label>
                        <input type="email" className="form-control" name="email" placeholder="e.g., johndoe@example.com" value={owner.email} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Phone Number: <span className="text-danger fs-5">*</span></label>
                        <PhoneInput international initialValueFormat="national" defaultCountry={"KE"} value={owner.phone_number} onChange={handlePhoneNumberChange} required/>
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
 
export default AddOwner;