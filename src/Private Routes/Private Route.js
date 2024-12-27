/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Example function to check if the user is authenticated
const isAuthenticated = () => localStorage.getItem('X-Session-ID') !== null;

const PrivateRoute = ({ element }) => 
{
  const navigate = useNavigate()
  useEffect(() => 
  {
    if (!isAuthenticated()) 
    {
      // Show the toast notification
      toast.error('You must be logged in to access this page.');
      navigate("/login")
    }
  }, []); // Empty dependency array to run only once on mount


  return element; // Render the protected route if authenticated
};

export default PrivateRoute;
