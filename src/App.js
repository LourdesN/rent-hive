import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import './App.css';
import "./Assets/CSS/Navbar.css"
import "./Assets/CSS/Properties.css"

import { Routes, Route } from 'react-router-dom';
import Landing from "./Landing Page/Home"
import Login from "./Login/Login";

function App() 
{
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Landing/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
      </Routes>
    </>
  );
}

export default App;
