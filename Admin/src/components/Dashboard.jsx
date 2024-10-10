import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import user from "/programmer.png";
import { Navbar } from "./Navbar";

export const Dashboard = ({ data }) => {
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin"));
  });
  const [state, setState] = useState("dashboard");
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  console.log(state);
  useEffect(() => {
    const loggedUser = localStorage.getItem("admin");
    if (loggedUser) {
      try {
        setAdmin(JSON.parse(loggedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false); // set loading to false after checking
  }, []);

  //const username = user.email
  //console.log(username)
  const logout = () => {
    localStorage.removeItem("admin"); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page
  };
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Navbar/>
      <div className="text-white w-[22%] mx-6 rounded-2xl fixed my-20 h-full py-10 bg-[#232323]">
        <div className="flex justify-center bg-transparent">
          <img
            className="h-28 rounded-full border-2 px-5 py-5 bg-transparent"
            src={user}
            alt=""
          />
        </div>
        <p className="bg-transparent text-2xl font-semibold text-center my-3">
          {admin.fname} {admin.lname}
        </p>
        <ul className="px-4 bg-transparent  ">
          <li
            onClick={() => setState("dashboard")}
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
          >
            <CiUser className="bg-transparent text-2xl" />
            DashBoard
          </li>
          <li
            onClick={() => setState("Users")}
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
          >
            <FaUsers className="bg-transparent text-2xl" />
            UserList
          </li>
          <li
            onClick={() => setState("Animes")}
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
          >
            <BiSolidMoviePlay className="bg-transparent text-2xl" /> Animes
          </li>
          <li
            onClick={() => setState("Setting")}
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
          >
            <CiSettings className="bg-transparent text-2xl" />
            Settings
          </li>
        </ul>
      </div>
      <div className="ml-[25%]">
        {state == "dashboard" ? (
          <DashBoardd />
        ) : state == "Users" ? (
          <Users />
        ) : state == "Animes" ? (
          <Animes animeData={data} />
        ) : state == "Setting" ? (
          <ChangePassword />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

function DashBoardd() {
  const [admin, setAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("admin"));
  });
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = localStorage.getItem("admin");
    if (loggedUser) {
      try {
        setAdmin(JSON.parse(loggedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false); // set loading to false after checking
  }, []);

  if (loading) return <p className="text-white text-7xl">Loading...</p>;
  return (
    <>
      <div className="text-white pt-20">
        <p className="text-white text-4xl font-semibold  px-2">
          Welcome {admin.fname} Sir.
        </p>
      </div>
    </>
  );
}

function Users() {
  const [allUsers, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://anime-com-backend.onrender.com/api/getUsers");
        const data = await response.json();
        setUsers(data.users);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className=" rounded-2xl px-10  pb-10">
      <div className="text-white text-3xl pt-20 font-semibold bg-transparent rounded-2xl ">
        Users
      </div>
      <div className="my-10 grid grid-cols-2 gap-4 mx-2 bg-transparent">
        {allUsers.map((item) => {
          return (
            <>
              <p className="text-white  font-semibold flex gap-2 items-center bg-[#727272] my-1 py-3 rounded-lg px-6">
                <CiUser className="text-2xl bg-transparent" />
                {item.email}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
}

function Animes({ animeData }) {
  return (
    <>
      <div className=" rounded-2xl px-10  pb-10">
        <div className="flex justify-between w-full items-center">
          <div className="text-white text-3xl pt-24 font-semibold bg-transparent rounded-2xl ">
            Anime Series
          </div>
          <div className="pt-24">
            <Link to={"/addAnime"}><button className=" bg-[#f00072] text-white font-semibold px-4 py-3 rounded flex gap-2 items-center">
              <FaPlus className="bg-transparent"/>Add New Anime
            </button></Link>
          </div>
        </div>
        <div className="grid grid-cols-5 my-4">
          {animeData.map((item) => {
            return (
              <>
                <Link to={`/animeDetails/name/${item.name}`} key={item.name}>
                  <div className="text-white px-3 my-3">
                    <img
                      className=""
                      src={`https://anime-com-backend.onrender.com/${item.image}`}
                      alt=""
                    />
                    <p className="text-sm w-full font-semibold my-2">
                      {item.name}
                    </p>
                    <div></div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const adminId = JSON.parse(localStorage.getItem("admin")).adminId;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
   
    if (newPassword !== confirmPassword) {
     alert("New PAssword does not matched")
    }

    try {
      const response = await fetch(`http://localhost:4000/api/changepass/${adminId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to change password.');
      }
      else
      {
        alert("New Password set successfully...!")
        setConfirmPassword("")
        setCurrentPassword("")
        setNewPassword("")
      }
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <>
    <div className="password-change-form text-white">
      <div className="text-3xl font-semibold text-white mx-2  my-5">
        Change Your Password
      </div>
      <form className="px-3" onSubmit={handlePasswordChange}>
        <div className="my-5">
          <label className="text-lg font-semibold  ">Current Password:</label>
          <br />
          <input 
          className='border-white text-white border-2 py-2 px-4 rounded-md font-semibold'
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required
            placeholder="Enter Current Password"
          />
        </div>
        <div>
          <label className="text-lg font-semibold ">New Password</label><br />  
          <input 
            className='border-white text-white border-2 py-2 px-4 rounded-md font-semibold'
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required
            placeholder="Enter New Password"
          />
        </div>
        <div className="my-5">
          <label className="text-lg font-semibold">Confirm New Password:</label>
          <br />
          <input 
            className='border-white text-white border-2 py-2 px-4 rounded-md font-semibold'
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
            placeholder="Please Confirm New Password"
          />
        </div>
        <button
          type="submit"
            className=" bg-[#f00072] text-white font-semibold px-4 py-2 rounded">
            Change Password
          </button>
      </form>
    </div>
    </>
  );
}
