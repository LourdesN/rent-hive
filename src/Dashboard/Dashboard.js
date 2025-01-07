/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Loader from "../Assets/Components/Loader"

import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import Landing from "./Landing Page/Home"
import Properties from "./Owners/Properties/Properties"
import ErrorPage from "../404/Error"

const Dashboard = () => 
{
    //useState hook for the sidebar
    const [sidebarVisible, setSidebarVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    //Common state values
    const [fullName,setFullName]=useState("")
    const [role, setRole]=useState("")
    const [username, setUsername]=useState()

    //State values for the dashboard landing page
    const [soon, setSoon]=useState(0)
    const [sooner, setSooner]=useState(0)
    const [soonest, setSoonest]=useState(0)

    //Fetching the data from the backend
    useEffect(()=>
    {
        fetch("https://rent-hive-backend.vercel.app/dashboard",
        {
            method: "GET",
            headers:
            {
                "X-Session-ID": localStorage.getItem("X-Session-ID")
            }
        })
        .then(response => response.json())
        .then(data =>
        {
            if(data.type === "success")
            {
                setFullName(data.fullName)
                setRole(data.role)
                setUsername((data.fullName.split(" ")[0].charAt(0) + data.fullName.split(" ")[1]).toLowerCase())
            }
        })
        .finally(()=> setIsLoading(false))
    },[])

    //Function to handle opening and closing of the sidebar when the icon in the navbar is clicked
    const toggleSidebar = () => setSidebarVisible((prevState) => !prevState)

    // Hook to access the current route
    const location=useLocation()

    // Function to handle clicks outside the sidebar
    const handleOutsideClick = () => setSidebarVisible(false)
  
    //useEffect function to close the sidebar when the route changes
    useEffect(()=> setSidebarVisible(false),[location])


    return ( 
        <>
            <Navbar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible}  username={username}/>
            <Sidebar isVisible={sidebarVisible} role={role} className="sidebar"/>
            <div className="bg-white text-dark min-vh-100 w-100" style={{paddingTop: "80px"}} onClick={handleOutsideClick}>
                {
                    isLoading
                    ?
                        <Loader/>
                    :
                        <Routes>
                            <Route exact path="/" element={<Landing fullName={fullName} role={role}/>}/>
                            <Route exact path="/properties" element={<Properties/>}></Route>
                            <Route exact path="*" element={<ErrorPage/>}></Route>
                        </Routes>
                }
            </div>
        </>
     )
}
 
export default Dashboard