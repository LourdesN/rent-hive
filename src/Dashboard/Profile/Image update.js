import { useState } from "react"
import { toast } from "react-toastify"

const UploadImage = ({ setImageModal }) => 
{
    //State to store the uploaded image
    const [image, setImage] = useState(null)

    //State to handle the image preview
    const [preview, setPreview] = useState(null)

    //State to handle image upload status
    const [isSubmitting, setIsSubmitting] = useState(false)

    //Function to handle image change
    const handleImageChange = e =>
    {
        //Getting the uploaded image
        const image = e.target.files[0]

        if(image)
        {
            //Setting the image state
            setImage(image)

            //Setting the preview URL
            const previewURL=URL.createObjectURL(image)
            setPreview(previewURL)
        }
    }

    //Function to update the profile image
    const updateProfileImage =  e =>
    {
        e.preventDefault()
        setIsSubmitting(true)

        console.log(image)

        const formData= new FormData()
        formData.append('profile_image', image)

        fetch("https://rent-hive-backend.vercel.app/profile",
        {
            method: "PATCH",
            headers:
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => 
        {
            data.type === "success"
            ?
                toast.success(data.message)
            :
                toast.error(data.message)
        })
        .finally(()=>
        {
            setIsSubmitting(false)
            setImageModal(false)
            setImage(null)
        })
    }

    return ( 
        <form className="position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 z-3" onSubmit={updateProfileImage}>
            <div className="bg-white rounded-3 shadow-lg p-4 w-25">
                {/* Modal Header */}
                <div className="modal-header d-flex justify-content-between align-items-center border-bottom pb-2">
                    <h5 className="modal-title">Upload New Profile Image</h5>
                    <button type="button" className={`btn-close ${isSubmitting ? "disabled" : ""}`} onClick={() => setImageModal(false)}></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body mt-3">
                    <input type="file" className="form-control" id="image" accept="image/*" multiple={false} onChange={handleImageChange} required/>
                    {
                        image &&
                        (
                            <img src={preview} alt="Preview" className="img-fluid rounded mx-auto d-block mt-2 mb-4" style={{ width: "auto", height: "auto", objectFit: "contain" }}/>
                        )
                    }
                </div>

                {/* Modal Footer */}
                <div className="modal-footer d-flex justify-content-between gap-2 mt-3">
                    <button type="submit" className={`btn btn-success ${isSubmitting ? "disabled" : ""}`}>
                        {
                            isSubmitting 
                            ? 
                                "Uploading..." 
                            : 
                                "Upload"
                        }
                    </button>
                    <button type="button" className={`btn btn-secondary ${isSubmitting ? "disabled" : ""}`} onClick={() => setImageModal(false)}>Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default UploadImage;
