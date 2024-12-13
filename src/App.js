import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css'

import './App.css';
import "./Assets/CSS/Login.css"
import "./Assets/CSS/Navbar.css"
import "./Assets/CSS/Properties.css"
import "./Assets/CSS/Sidebar.css"
import "./Assets/CSS/Signup.css"

import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify'

import Landing from "./Landing Page/Home"
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import Dashboard from "./Dashboard/Dashboard";

function App() 
{
  return (
    <>
      <ToastContainer position='top-right' bodyClassName="text-black" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='light' transition={Slide}/>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path="/sign-up" element={<SignUp/>}></Route>
        <Route exact path="/dashboard/*" element={<Dashboard/>}></Route>
      </Routes>
    </>
  );
}

export default App;
