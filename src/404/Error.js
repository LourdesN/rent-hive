import { useNavigate } from "react-router-dom"

const ErrorPage = () => 
{
    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex align-items-center justify-content-center min-vh-100 px-4">
                <div className="text-center">
                    <h1 className="display-1 fw-bold text-secondary">404</h1>
                    <p className="fs-2 fw-bold text-body">Uh-oh!</p>
                    <p className="mt-3 text-muted">We can't find that page.</p>
                    <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">Go back</button>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
