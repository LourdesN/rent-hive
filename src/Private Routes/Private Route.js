import {useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from '../Context/Login Context'
import { toast } from 'react-toastify'

const PrivateRoute = ({ element: Component, ...rest }) => 
{
  const { isAuthenticated } = useLogin();
  const location=useLocation()

  useEffect(()=>
  {
    if(!isAuthenticated)
    {
      toast.error("Kindly log in to continue!")
      localStorage.setItem('redirectUrl', location.pathname)
    }
  },[isAuthenticated, location.pathname])
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
