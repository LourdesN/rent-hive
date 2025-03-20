import { CiCamera } from "react-icons/ci";

const Profile = () =>
{
    const fullName = "Samuel Muigai"
    const role = "Home Owner"
    const email = "ndungu.muigai01@gmail.com"
    const phone = "+254707251073" 
    return(
        <div className="container p-4">
            <div className="d-flex align-items-center gap-4 border-bottom pb-3">
                <div className="position-relative border p-3 rounded">
                    <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&size=200" alt={`${fullName}'s profile image`} className="rounded-circle" width="100" height="100"/>
                    <button className="btn btn-light position-absolute bottom-0 end-0 p-1 border rounded-circle">
                        <CiCamera className="text-dark fs-5"/>
                    </button>
                </div>
                <div>
                    <h4 className="border-bottom p-1">User details</h4>
                    <p className="mb-1">Name: {fullName}</p>
                    <p className="mb-1">Role: {role}</p>
                    <p className="mb-1">Email: {email}</p>
                    <p className="mb-1">Phone number: {phone}</p>
                </div>
            </div>

            {/* Change password section */}
            <div className="mt-4">
                <h5 className="text-center border-bottom pb-2">Change password</h5>
                <form className="row gap-3">
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
        </>
    )
}

export default Profile