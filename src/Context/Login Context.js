/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

// Create Context
const LoginContext = createContext()

// Create a custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext)

// Create a provider component
export const LoginProvider = ({ children }) => 
{
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const hasCheckedSession = useRef(false) // Flag to track session check

    useEffect(() => 
    {
        // Check if the user is authenticated and if the session has expired
        const authStatus = localStorage.getItem('isAuthenticated')
        const loginTime = localStorage.getItem('loginTime')
        if (authStatus === 'true' && loginTime) 
        {
            const currentTime = new Date().getTime()
            const timeElapsed = currentTime - parseInt(loginTime, 10)

            timeElapsed < 30 * 60 * 1000 // 30 minutes expiration
            ?
                setIsAuthenticated(true)
            :
                checkSessionExpiration(true) // Logs out if more than 30 minutes have passed
            }
    }, [])

    // Function to check if the user has been logged in for more than 30 minutes
    const checkSessionExpiration = (initialCheck = false) => 
    {
        const loginTime = localStorage.getItem('loginTime')
        if (loginTime) 
        {
            const currentTime = new Date().getTime()
            const timeElapsed = currentTime - parseInt(loginTime, 10)

            if (timeElapsed >= 30 * 60 * 1000) 
            { // 30 minutes expiration
                if (!initialCheck || !hasCheckedSession.current) 
                {
                    hasCheckedSession.current = true
                    handleLogout(true)
                }
            }
        }
    }

    // Login function
    const login = async loginCredentials => 
    {
        setLoading(true)
        try 
        {
            const response = await fetch("https://rent-hive-backend.vercel.app/login",
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginCredentials)
            })

            const message = await response.json()
            if (!response.ok) 
            {
                throw new Error(`${message.message}` || "An unexpected error occurred. Please try again later!")
            }

            setLoading(false)
            if (message.type === "success") 
            {
                const loginTime = new Date().getTime()
                localStorage.setItem('isAuthenticated', 'true')
                localStorage.setItem('loginTime', loginTime.toString())
                localStorage.setItem('X-Session-ID', message.session_id) // Set session ID
                setIsAuthenticated(true)

                // Set a timer to unset X-Session-ID after 30 minutes
                setTimeout(() => 
                {
                    localStorage.removeItem('X-Session-ID')
                    handleLogout(true) // Auto logout after 30 minutes
                }, 30 * 60 * 1000)

                toast.success(message.message, 
                {
                    onClose: () => 
                    {
                        setIsAuthenticated(true)
                        const redirectUrl = localStorage.getItem("redirectUrl") || "/dashboard"
                        localStorage.removeItem("redirectUrl")
                        navigate(redirectUrl)
                    }
                })
            } 
            else 
            {
                toast.error(message.message)
            }
        } 
        catch (error) 
        {
            setLoading(false)
            toast.error(`${error.message}` || "An unexpected error occurred. Please try again later!")
        }
    }

    // Function to handle logout
    const handleLogout = async (sessionExpired = false) => 
        {
            setLoading(true)
            try 
            {
                const response = await fetch("https://rent-hive-backend.vercel.app/logout", 
                {
                    method: "POST"
                })
                const result = await response.json()
                if (!response.ok) 
                {
                    throw new Error(`${result.message}. Please try again later` || "An unexpected error occurred")
                }
    
                if (result.type === "success") 
                {
                    localStorage.removeItem('isAuthenticated')
                    localStorage.removeItem('loginTime')
                    localStorage.removeItem('X-Session-ID') // Unset session ID
                    setIsAuthenticated(false)
                    navigate("/login")
    
                    if (sessionExpired) 
                    {
                        toast.error("Session expired. Kindly login again")
                    } 
                    else 
                    {
                        toast.success("Logged out successfully")
                    }
                } 
                else 
                {
                    toast.error(result.message)
                }
            } 
            catch (error) 
            {
                toast.error(`${error.message}.` || "An unexpected error occurred.")
            } 
            finally 
            {
                setLoading(false)
            }
        }

    // Logout function
    const logOut = () => handleLogout(false) // Pass false for regular logout

    // Periodically check session expiration (optional)
    useEffect(() => 
    {
        const interval = setInterval(checkSessionExpiration, 60 * 1000) // Check every minute
        return () => clearInterval(interval) // Cleanup on unmount
    }, [])

    return (
        <LoginContext.Provider value={{ isAuthenticated, login, logOut, loading }}>
            {children}
        </LoginContext.Provider>
    )
}
