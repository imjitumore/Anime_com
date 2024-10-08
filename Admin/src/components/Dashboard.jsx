import React,{useState,useEffect} from "react";
import logo from "/logo.png";
import {useNavigate} from "react-router-dom"
import { CiSettings, CiUser } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import user from "/programmer.png"


export const Dashboard = () => {

    const [admin,setAdmin]=useState(()=>{
        return JSON.parse(localStorage.getItem("admin"))
    })
    const [state ,setState] = useState("dashboard")
    const [loading,setLoading]=useState()
    const navigate = useNavigate()
    console.log(state)
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
            <p className="text-2xl text-white flex items-center gap-3"><CiUser/>{admin.fname} {admin.lname}</p>
          <button className=" bg-[red] text-white font-semibold px-4 py-2 rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div  className="text-white w-[22%] fixed my-20 h-full py-10 bg-[#232323]">
        <div className="flex justify-center bg-transparent">
            <img className="h-28 rounded-full border-2 px-5 py-5 bg-transparent" src={user} alt="" />
        </div>
        <p className="bg-transparent text-2xl font-semibold text-center my-3">{admin.fname} {admin.lname}</p>
        <ul className="px-4 bg-transparent  " >
            <li onClick={()=>setState("dashboard")} className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"><CiUser className="bg-transparent text-2xl"/>DashBoard</li>
            <li onClick={()=>setState("Users")} className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"><FaUsers className="bg-transparent text-2xl" />UserList</li>
            <li onClick={()=>setState("Animes")} className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"><BiSolidMoviePlay className="bg-transparent text-2xl"/> Animes</li>
            <li onClick={()=>setState("Setting")} className="flex items-center gap-3 text-lg font-semibold my-4 py-3 px-6 bg-[#727272] rounded-lg cursor-pointer w-full"><CiSettings className="bg-transparent text-2xl"/>Settings</li>
        </ul>
      </div>
      <div className="ml-[25%]">
       {state=="dashboard"?<DashBoardd/>:state=="Users"?<Users/>:state=="Animes"?<Animes/>:state=="Setting"?<Settings/>:""}
      </div>
    </>
  );
};

function DashBoardd()
{
    const [admin,setAdmin]=useState(()=>{
        return JSON.parse(localStorage.getItem("admin"))
    })
    const [loading,setLoading]=useState()
    const navigate = useNavigate()
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
    return( <>
        <div className="text-white pt-20">
            <p className="text-white text-4xl font-semibold ">Welcome {admin.fname} Sir.</p>
        </div>
    </>)
}

function Users()
{
    return(
        <>
            <div className="text-white text-xl font-semibold py-20  ">Users</div>
        </>
    )
}

function Animes()
{
    return(
        <>
            <div className="text-white text-xl font-semibold py-20">
                Animes
            </div>
        </>
    )
}

function Settings()
{
    return(
        <>
            <div className="text-white text-xl font-semibold py-20">Settings</div>
        </>
    )
}