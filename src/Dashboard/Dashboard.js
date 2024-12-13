/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Landing from "./Landing Page/Home";
const Dashboard = () => 
{
    //useState hook for the sidebar
    const [sidebarVisible, setSidebarVisible] = useState(false);

    //Common state values
    const [fullName,setFullName]=useState("Samuel Muigai")
    const [username, setUsername]=useState("smuigai")


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
            <Sidebar isVisible={sidebarVisible} className="sidebar"/>
            <div className="bg-white text-dark min-vh-100 w-100" onClick={handleOutsideClick}>
                <Routes>
                    <Route exact path="/" element={<Landing fullName={fullName}/>}/>
                </Routes>
            </div>
        </>
     );
}
 
export default Dashboard;