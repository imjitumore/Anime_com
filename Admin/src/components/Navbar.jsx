import React,{useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { CiSettings, CiUser } from "react-icons/ci";

export const Navbar = () => {
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

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
    if (loading) return <p>Loading...</p>;
  };
  return (
    <>
      <div>
        <div className="flex justify-between py-3 px-6 w-full fixed">
          <Link to={"/dashboard"}><div>
            <img className="h-14" src={logo} alt="" />
          </div></Link>
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
      </div>
      <hr className="text-white" />
    </>
  );
};
