/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Loader from "../Assets/Components/Loader"

import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import Landing from "./Landing Page/Home"
import Properties from "./Owners/Properties/Properties"
import AvailableProperties from "./Tenants/Available Properties/Properties"
import AvailableProperty from "./Tenants/Available Properties/Property"
import Invoices from "./Tenants/Invoices/Invoices"
import Invoice from "./Tenants/Invoices/Invoice"
import Leases from "./Tenants/Leases/Leases"
import Lease from "./Tenants/Leases/Lease"
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
    const [properties, setProperties]=useState(0)
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
                setFullName(data?.fullName)
                setRole(data?.role)
                setUsername((data?.fullName.split(" ")[0].charAt(0) + data?.fullName.split(" ")[1]).toLowerCase())
                setProperties(data?.properties)
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
                            <Route exact path="/" element={<Landing fullName={fullName} role={role} properties={properties}/>}/>
                            <Route exact path="/properties" element={<Properties fullName={fullName}/>}></Route>
                            <Route exact path="/available-properties" element={<AvailableProperties/>}></Route>
                            <Route exact path="/available-properties/:id" element={<AvailableProperty/>}></Route>
                            <Route exact path="/invoices" element={<Invoices/>}></Route>
                            <Route exact path="/invoices/:ref" element={<Invoice/>}></Route>
                            <Route exact path="/leases" element={<Leases fullName={fullName}/>}></Route>
                            <Route exact path="/leases/:id" element={<Lease/>}></Route>
                            <Route exact path="*" element={<ErrorPage/>}></Route>
                        </Routes>
                }
            </div>
        </>
     )
}
 
export default Dashboard