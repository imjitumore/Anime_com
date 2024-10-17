import React, { useEffect, useState } from "react";
import { CiMenuBurger, CiPassport1, CiSettings, CiUser, CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import admin from "/add-user.png";
import { MdHistory, MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { FaMendeley } from "react-icons/fa";


export const Dashboard = ({setUserr}) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [value,setValue] = useState(false)

  useEffect(() => {
    // if (!user?.userId) return; // Use optional chaining to ensure user exists
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://anime-com-backend.onrender.com/api/getUsersProfile/${user.userId}`
        );
        const data = await response.json();
        console.log(data);
        setProfile(data.users); // Set profile state with the fetched data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user?.userId]); // Ensure the effect runs when userId changes

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
    setUserr(localStorage.removeItem("user"));
    navigate("/login"); // Redirect to the login page
  };

  if (loading) return <p>Loading...</p>;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("profile", selectedFile); // Append the selected file

    try {
      // Send the file via a POST request using fetch
      const response = await fetch(
        `https://anime-com-backend.onrender.com/api/profile/${user.userId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            // No need to set Content-Type when using FormData with fetch
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Error uploading file");
      }

      const data = await response.json();
      alert("Profile Updated");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
 
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
      <div className=" text-white flex  h-full">
        <ul className={`${value?"py-24 px-6 sm:w-[22%] sm:static  absolute left-0  sm:block border-white transition-all ease-in-out duration-1000 h-screen  bg-[#232323]":"py-24 px-6 sm:w-[22%] sm:static transition-all ease-in-out duration-1000 -left-full  absolute border-white h-screen  bg-[#232323]"} `}>
        <div className="text-white bg-transparent float-right"><RxCross2 onClick={()=>setValue(!value)}  className={`${value?"text-white sm:text-2xl text-lg cursor-pointer bg-transparent ":"text-white sm:text-2xl text-lg cursor-pointer bg-transparent hidden"}`}/></div>
          <div className="flex justify-center bg-transparent">
            <label className="bg-transparent" htmlFor="profile">
              {!profile || !profile.profileImage ? (
                <div className="bg-transparent">
                  <img
                    className="bg-[#232323] py-2 px-2 h-32 border-2 rounded-full"
                    src={admin}
                    alt=""
                  />
                </div>
              ) : (
                <img
                className="bg-transparent py-2 px-2 h-32 border-2 rounded-full"
                  src={`https://anime-com-backend.onrender.com/${profile.profileImage}`}
                  alt="Profile Image"
                />
              )}
            </label>

            <input
              type="file"
              hidden
              id="profile"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-xl text-center text-white font-semibold flex items-center justify-center gap-2 bg-transparent my-2">
            {user.email.toUpperCase().replace("@GMAIL.COM", "")}
          </p>
          <li
            className="text-white flex items-center gap-2 text-xl font-semibold  py-3 px-6 bg-[#727272] rounded-lg  cursor-pointer w-full mt-5"
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
        <div className="my-20 w-full">
          <div className="ml-6"><CiMenuBurger onClick={()=>setValue(!value)} className={`${value?"text-xl hidden":"text-xl "}`}/></div>
          {allItems == "" ? (
            <UserDashboard />
          ) : allItems == "watchlist" ? (
            <WatchList />
          ) : allItems == "Settings" ? (
            <ChangePassword />
          ) : allItems == "History" ? (
            <History />
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
      fetch(`https://anime-com-backend.onrender.com/api/getwatchlist/${user.userId}`)
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
    fetch(`https://anime-com-backend.onrender.com/api/removeAnime/${userId.userId}/${name}`, {
      method: "DELETE",
      headers: { "Contect-type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch("https://anime-com-backend.onrender.com/api/getwatchlist")
          .then((resp) => resp.json())
          .then((data) => setWatchlist(data));
      });
  }

  return (
    <>
      <div className="sm:text-3xl text-2xl sm:my-0 my-4  font-semibold text-white sm:mx-2 mx-5 ">
        MY Watch List
      </div>
      <div className=" sm:py-4  sm:grid grid-cols-2  sm:mx-0  mx-3">
        {watchdata.map((item, i) => {
          return (
            <>
              <div className="flex sm:my-3 my-5 justify-between gap-2 mx-3 ">
                <div>
                  <img
                    className="text-white w-52 object-cover"
                    src={`https://anime-com-backend.onrender.com/${item.image}`}
                    alt={item.image}
                  />
                </div>
                <div className="text-white  sm:text-xl text-md font-semibold w-full">
                  {item.name}
                </div>
                <div>
                  <Link
                    to={`/animeinfo/name/${item.name}/category/${item.category}`}
                  >
                    <button className="bg-[#00f2f2] sm:py-2 py-1  sm:mx-0 sm:w-36 w-32  font-semibold rounded-lg text-md">
                      Visit Anime
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteAnime(item.name)}
                    className="bg-[#f00079] sm:py-2 py-1 my-2 sm:w-36 w-32 font-semibold rounded-lg text-md"
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
    <div className="w-full sm:py-0 py-10">
      <h2 className="sm:text-2xl text-lg sm:px-0 px-4 my-4 font-semibold text-center leading-relaxed text-white">
        <div className="sm:text-3xl text-2xl">
          <span className="text-[red]">Thank you</span> for joining US,{" "}
          {user.email}! <br />
        </div>
        <br />
        We're thrilled to have you as part of our community. <br />
        Get ready to dive into an endless world of anime adventures. <br />
        <p className="text-[#f00072] sm:text-3xl text-lg my-3">
          Enjoy watching and explore to your heart’s content!❤️🎥
        </p>
      </h2>
    </div>
  );
}

function History() {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch user history only once after component mount
    fetch(`https://anime-com-backend.onrender.com/api/gethistory/${userId.userId}`)
      .then((resp) => resp.json())
      .then((historyData) => setData(historyData)) // Set the history data
      .catch((error) => console.error("Error fetching history:", error)); // Handle any fetch errors
  }, [userId]);
  return (
    <>
      <h2 className="text-3xl sm:my-0 my-4 font-semibold leading-relaxed text-white px-4">
        History
      </h2>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mx-4">
        {data.map((item) => {
          return (
            <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
              <div className="h-full sm:my-3 sm:py-0 py-2">
                <img
                  className="py-2 "
                  src={`https://anime-com-backend.onrender.com/${item.image}`}
                  alt={item.image}
                />
                <p className="sm:text-xl font-semibold  my-1">{item.name}</p>
                <p className="text-md ">{item.language}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New Password does not match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://anime-com-backend.onrender.com/api/changepassword/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to change password.");
      }
      alert("Password changed successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="password-change-form text-white ">
        <div className="am:text-3xl text-2xl font-semibold text-white mx-3  my-5 sm:text-left text-center w-full">
          Change Your Password
        </div>
        <form className=" w-full sm:px-4 px-14" onSubmit={handlePasswordChange}>
          <div className="my-5">
            <label className="text-lg font-semibold  ">Current Password:</label>
            <br />
            <input
              className="border-white text-white border-2 py-2 px-4 rounded-md font-semibold"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter Current Password"
            />
          </div>
          <div>
            <label className="text-lg font-semibold ">New Password</label>
            <br />
            <input
              className="border-white text-white border-2 py-2 px-4 rounded-md font-semibold"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter New Password"
            />
          </div>
          <div className="my-5">
            <label className="text-lg font-semibold">
              Confirm New Password:
            </label>
            <br />
            <input
              className="border-white text-white border-2 py-2 px-4 rounded-md font-semibold"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Please Confirm New Password"
            />
          </div>
          <button
            type="submit"
            className=" bg-[#f00072] text-white font-semibold px-4 py-2 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}
