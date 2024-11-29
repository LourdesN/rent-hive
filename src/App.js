import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-phone-number-input/style.css'

import './App.css';
import "./Assets/CSS/Login.css"
import "./Assets/CSS/Navbar.css"
import "./Assets/CSS/Properties.css"
import "./Assets/CSS/Signup.css"

import { Routes, Route } from 'react-router-dom';
import Landing from "./Landing Page/Home"
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";

function App() 
{
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path="/sign-up" element={<SignUp/>}></Route>
      </Routes>
    </>
  );
}

export default App;
