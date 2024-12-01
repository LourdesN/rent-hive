import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"

import Logo from "../Assets/Images/Logo.jpg"
import Loader from "../Assets/Components/Loader"
import { toast } from "react-toastify"

const Login = () => 
{
  const navigate = useNavigate()
  const [loading, setLoading]=useState(false)
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  })
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = e => setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })

  const toggleVisibility = () => setPasswordVisibility((prevState) => !prevState)

  const handleRememberMeChange = () => setRememberMe((prev) => !prev)

  const submitLogin = e => 
  {
    e.preventDefault()
    setLoading(true)
    fetch("https://rent-hive-backend.vercel.app/login",
    {
      method: "POST",
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(loginCredentials)
    })
    .then(response => response.json())
    .then(message =>
    {
      message.type === "success"
      ?
        toast.success(message.message,
          {
            onClose: ()=> navigate("/dashboard")
          })
      :
        toast.error(message.message)
    })
    .finally(()=> setLoading(false))
  }

  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center login-backgound">
      {loading && <Loader/>}
      <nav className="login-nav">
          <Link to="/" className="btn btn-link btn-outline-none fw-bold">Home</Link>
      </nav>
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%", marginTop: "1.5rem" }}>
        <img src={Logo} alt="Rent Hive Logo" className="w-100" style={{ height: "200px", objectFit: "contain"}} />
        <form onSubmit={submitLogin} className="p-3">
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" value={loginCredentials.email} onChange={handleInputChange} className="form-control" placeholder="Email address" required/>
          </div>
          <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={passwordVisibility ? "text" : "password"} name="password" value={loginCredentials.password} onChange={handleInputChange} className="form-control" placeholder="Password" required/>
              <span className="position-absolute end-0 password-icon translate-middle-y me-3 cursor-pointer" onClick={toggleVisibility}
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} className="form-check-input"/>
              <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
            </div>
            <Link to="/password-reset/new-request" className="text-decoration-none">Forgot password?</Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login