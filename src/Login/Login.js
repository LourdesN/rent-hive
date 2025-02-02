import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useLogin } from "../Context/Login Context"

import Logo from "../Assets/Images/Logo.jpg"
import Loader from "../Assets/Components/Loader"

const Login = () => 
{
  const { login, loading } = useLogin()
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  })
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(()=>
  {
      const savedEmail = localStorage.getItem("email")
      const savedPassword = localStorage.getItem("password")
      if(savedEmail && savedPassword)
      {
          setLoginCredentials({email: savedEmail, password: savedPassword})
          setRememberMe(true)
      }
  },[])

  const handleInputChange = e => setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })

  const toggleVisibility = () => setPasswordVisibility((prevState) => !prevState)

  const handleRememberMeChange = () => setRememberMe((prev) => !prev)

  const submitLogin = e => 
  {
    e.preventDefault()
    if(rememberMe)
    {
      localStorage.setItem("email", loginCredentials.email)
      localStorage.setItem("password", loginCredentials.password)
    }
    else
    {
      localStorage.removeItem("email")
      localStorage.removeItem("password")
    }
    login(loginCredentials)
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
          <Link to="/sign-up" className="d-flex justify-content-center text-decoration-none py-2">Don't have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login