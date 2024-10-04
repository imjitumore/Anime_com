import React, { useEffect, useState } from 'react';
import { CiIndent, CiPassport1, CiUser, CiViewList } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');

    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    setLoading(false); // set loading to false after checking
  }, [navigate]);


  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/login'); // Redirect to the login page
  };
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='flex justify-between items-center px-10 my-4'>
        <p className='text-white text-3xl font-semibold '>Dashboard</p>
        <button onClick={logout} className=" bg-[red] text-white font-semibold px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <hr />
      <div className=' text-white flex gap-20'>
        <ul className='my-6 px-6'>
          <li className='flex items-center gap-2 text-lg font-semibold my-3 '><CiUser className='text-white text-2xl  ' />{user.email}</li>
          <li className='flex items-center gap-2 text-lg font-semibold my-2'><CiPassport1/>{user.userId}</li>
          <li className='flex items-center gap-2 text-lg font-semibold my-3'><CiViewList/>WatchList</li>
        </ul>

        <div>      
          <h2 className='text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]'>Welcome to your dashboard <br /> {user.email}</h2>
        </div>    
      </div>
    </>
  );
};