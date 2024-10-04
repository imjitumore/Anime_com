import React, { useEffect, useState } from 'react';
import { CiPassport1, CiSettings, CiUser, CiViewList } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import logo from "/logo.png"
import { MdHistory, MdOutlineDashboard } from "react-icons/md";


export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState("")
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

  //const username = user.email
  //console.log(username)
  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/login'); // Redirect to the login page
  };
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='flex justify-between items-center px-5 pr-8 my-3'>
        <div><img className='w-40' src={logo} alt="" /></div>
        <div className='flex gap-4 items-center'><p className='text-xl text-white font-semibold flex items-center gap-2'><CiUser className='text-2xl' />{user.email.toUpperCase().replace("@GMAIL.COM", "")}</p>
          <button onClick={logout} className=" bg-[red] text-white font-semibold px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
      <hr />
      <div className=' text-white flex gap-20 h-full'>
        <ul className='my-6 px-6 w-[25%] border-r-2 border-white h-full'>
          <li className='text-white flex items-center gap-2 text-xl font-semibold  py-3 px-6 bg-[#727272] rounded-lg  cursor-pointer' onClick={() => setAllItems("Dashboard")}><MdOutlineDashboard className='text-white text-2xl bg-transparent' />Dashboard</li>
          <li className='flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer' onClick={() => setAllItems("watchlist")} ><CiViewList className='text-xl bg-transparent' />WatchList</li>
          <li className='flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer'onClick={() => setAllItems("Settings")} ><CiSettings className='text-2xl bg-transparent' />Settings</li>
          <li className='flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer' onClick={() => setAllItems("History")}><MdHistory className='text-2xl bg-transparent' />History</li>
        </ul>
        <div>
          {allItems == "Dashboard" ? <UserDashboard /> 
          : allItems == "watchlist" ? <WatchList />
          : allItems=="Settings"?<Settings/>:allItems=="History"?<History/>:""}
        </div>
      </div>
    </>
  );
};

function UserDashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []); 

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className='text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]'>Welcome to your dashboard <br />{user.email}</h2>
      <h2 className='flex items-center gap-2 text-lg font-semibold my-2'></h2>
    </>
  )
}

function WatchList() {
  return (
    <>
      <h2 className='text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]'>WatchList</h2>
    </>
  )
}

function Settings() {
  return (
    <>
      <h2 className='text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]'>Settings</h2>
    </>
  )
}

function History() {
  return (
    <>
      <h2 className='text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]'>History</h2>
    </>
  )
}