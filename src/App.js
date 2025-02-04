import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css'

import './App.css';
import "./Assets/CSS/Images.css"
import "./Assets/CSS/Login.css"
import "./Assets/CSS/Navbar.css"
import "./Assets/CSS/Properties.css"
import "./Assets/CSS/Sidebar.css"
import "./Assets/CSS/Signup.css"
import "./Assets/CSS/Stats.css"
import "./Assets/CSS/Table.css"

import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify'
import { LoginProvider } from "./Context/Login Context";

import PrivateRoute from "./Private Routes/Private Route";
import Landing from "./Landing Page/Home"
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import ErrorPage from "./404/Error";

function App() 
{
  return (
    <>
      <ToastContainer position='top-right' bodyClassName="text-black" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='light' transition={Slide}/>
      <LoginProvider>
        <Routes>
          <Route exact path='/' element={<Landing/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path="/sign-up" element={<SignUp/>}></Route> 
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
          <Route exact path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </LoginProvider>
    </>
  );
}

export default App;
