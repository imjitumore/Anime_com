import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import user from "/programmer.png";

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
      <div className="flex justify-between py-3 px-6 w-full fixed">
        <div>
          <img className="h-14" src={logo} alt="" />
        </div>
        <div className="flex items-center gap-3 font-semibold">
          <p className="text-2xl text-white flex items-center gap-3">
            <CiUser />
            {admin.fname} {admin.lname}
          </p>
          <button
            className=" bg-[red] text-white font-semibold px-4 py-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
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
          <Settings />
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
        <p className="text-white text-4xl font-semibold ">
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
        const response = await fetch("http://localhost:4000/api/getUsers");
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
        <div className="text-white text-3xl pt-20 font-semibold bg-transparent rounded-2xl ">
          Anime Series
        </div>
        <div className="grid grid-cols-5 my-4">
          {animeData.map((item) => {
            return (
              <>
                <Link to={`/animeDetails/name/${item.name}`} key={item.name}>
                  <div className="text-white px-3 my-3">
                    <img
                      className=""
                      src={`http://localhost:4000/${item.image}`}
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

function Settings() {
  return (
    <>
      <div className="text-white text-xl font-semibold py-20">Settings</div>
    </>
  );
}
