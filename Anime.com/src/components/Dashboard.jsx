import React, { useEffect, useState } from "react";
import { CiPassport1, CiSettings, CiUser, CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { MdHistory, MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (loggedUser) {
      try {
        setUser(JSON.parse(loggedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false); // set loading to false after checking
  }, [navigate]);

  //const username = user.email
  //console.log(username)
  const logout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page
  };
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center px-5 pr-8 py-4 z-10 fixed w-full">
        <div>
          <Link to={"/home"}>
            <img className="w-40" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-xl text-white font-semibold flex items-center gap-2">
            <CiUser className="text-2xl" />
            {user.email.toUpperCase().replace("@GMAIL.COM", "")}
          </p>
          <button
            onClick={logout}
            className=" bg-[red] text-white font-semibold px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <hr />
      <div className=" text-white flex  h-full bg-black">
        <ul className="py-6 px-6 w-[22%]  border-r border-white h-full fixed ">
          <li
            className="text-white flex items-center gap-2 text-xl font-semibold  py-3 px-6 bg-[#727272] rounded-lg  cursor-pointer w-full mt-20"
            onClick={() => setAllItems("")}
          >
            <MdOutlineDashboard className="text-white text-2xl bg-transparent" />
            Dashboard
          </li>
          <li
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
            onClick={() => setAllItems("watchlist")}
          >
            <CiViewList className="text-xl bg-transparent" />
            WatchList
          </li>
          <li
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
            onClick={() => setAllItems("History")}
          >
            <MdHistory className="text-2xl bg-transparent" />
            History
          </li>
          <li
            className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"
            onClick={() => setAllItems("Settings")}
          >
            <CiSettings className="text-2xl bg-transparent" />
            Settings
          </li>
          
        </ul>
        <div className="ml-6 my-20 pl-[22%]">
          {allItems == "" ? (
            <UserDashboard />
          ) : allItems == "watchlist" ? (
            <WatchList />
          ) : allItems == "Settings" ? (
            <ChangePassword/>
          ) : allItems == "History" ? (
            <History/>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

function WatchList() {
  const [watchdata, setWatchlist] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.userId) {
      fetch(
        `https://anime-com-backend.onrender.com/api/getwatchlist/${user.userId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch watchlist");
          }
          return response.json();
        })
        .then((data) => setWatchlist(data))
        .catch((error) => console.error("Error fetching watchlist:", error));
    } else {
      console.error("User not found in localStorage");
    }
  }, [watchdata]);

  function deleteAnime(name) {
    const userId = JSON.parse(localStorage.getItem("user"));
    fetch(
      `https://anime-com-backend.onrender.com/api/removeAnime/${userId.userId}/${name}`,
      {
        method: "DELETE",
        headers: { "Contect-type": "application/json" },
        body: JSON.stringify({ name }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetch("https://anime-com-backend.onrender.com/api/getwatchlist")
          .then((resp) => resp.json())
          .then((data) => setWatchlist(data));
      });
  }

  return (
    <>
      <div className="text-3xl font-semibold text-white mx-2 ">
        MY Watch List
      </div>
      <div className=" py-4 grid grid-cols-2 ">
        {watchdata.map((item, i) => {
          return (
            <>
              <div className="flex my-3 justify-between gap-2 mx-3  ">
                <div>
                  <img
                    className="text-white w-52 object-cover"
                    src={`https://anime-com-backend.onrender.com/${item.image}`}
                    alt={item.image}
                  />
                </div>
                <div className="text-white  text-xl font-semibold w-full">
                  {item.name}
                </div>
                <div>
                  <Link
                    to={`/animeinfo/name/${item.name}/category/${item.category}`}
                  >
                    <button className="bg-[#00f2f2] py-2 w-36  font-semibold rounded-lg text-md">
                      Visit Anime
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteAnime(item.name)}
                    className="bg-[#f00079] py-2 my-2 w-36  font-semibold rounded-lg text-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

function Settings() {
  return (
    <>
      <h2 className="text-3xl my-4 font-semibold text-center leading-relaxed text-[#fe6a13]">
        Settings
      </h2>
    </>
  );
}

function UserDashboard() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl my-4 font-semibold text-center leading-relaxed text-white">
        <div className="text-3xl">
          <span className="text-[red]">Thank you</span> for joining US,{" "}
          {user.email}! <br />
        </div>
        <br />
        We're thrilled to have you as part of our community. <br />
        Get ready to dive into an endless world of anime adventures. <br />
        <p className="text-[#f00072] text-3xl my-3">
          {" "}
          Enjoy watching and explore to your heart’s content!❤️🎥
        </p>
      </h2>
    </div>
  );
}

function History() {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  useEffect(() => {
    // Fetch user history only once after component mount
    fetch(`https://anime-com-backend.onrender.com/api/gethistory/${userId}`)
      .then((resp) => resp.json())
      .then((historyData) => setData(historyData)) // Set the history data
      .catch((error) => console.error("Error fetching history:", error)); // Handle any fetch errors
  }, [userId]);
  return (
    <>
      <h2 className="text-3xl font-semibold leading-relaxed text-white px-4">
        History
      </h2>
      <div className="grid grid-cols-4">
        {data.map((item) => {
          return (
            <Link
                    to={`/animeinfo/name/${item.name}/category/${item.category}`}
                  >
            <div className="  h-full my-3">
              <img
                className="py-2 px-4"
                src={`https://anime-com-backend.onrender.com/${item.image}`}
                alt={item.image}
              />
              <p className="text-xl font-semibold px-4 my-1">{item.name}</p>
              <p className="text-md px-4">{item.language}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
   
    if (newPassword !== confirmPassword) {
      toast.error("New Password does not match",{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
        theme:"light"
      })
      return;
    }

    try {
      const response = await fetch(`https://anime-com-backend.onrender.com/api/changepassword/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to change password.');
      }
      alert("Password changed successfully.")
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <>
    <ToastContainer/>
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