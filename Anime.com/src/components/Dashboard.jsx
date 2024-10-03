import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the logged-in user from localStorage
    const loggedUser = localStorage.getItem('user');
    
    if (loggedUser) {
      // Parse the user object from localStorage
      setUser(JSON.parse(loggedUser));
    } else {
      // If no user found, redirect to login
      navigate('/login');
    }
  }, [navigate]);
  if (!user) return <p>Loading...</p>;

  return (
    <div className='text-center text-white my-20'>
      <h2 className='text-3xl my-4' >Welcome to your dashboard, {user.email}</h2>
      <p>Here is your account information:</p>
      <ul>
        <li>Email: {user.email}</li>
        <li>User ID: {user.userId}</li> {/* Adjust this based on your user schema */}
        {/* Add more user fields as necessary */}
      </ul>
    </div>
  );
};
