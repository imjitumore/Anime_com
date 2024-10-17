import React, { useState } from "react";
import { CiUser, CiSearch, CiBookmark } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState(true);
  const [animeName, setAnimeName] = useState("");

  function search() {
    navigate(`/search?name=${animeName}`);
  }

  return (
    <>
      <div className="grid grid-cols-2 justify-between sm:px-10 px-3  py-1 h-14 items-center text-white shadow-md relative ">
        <div>
          <Link to={"/home"}>
            <img className="sm:h-12 h-8 " src={logo} alt="" />
          </Link>
        </div>
        <div className="flex justify-end sm:gap-8 gap-3  sm:font-bold font-semibold sm:text-xl items-center">
          <div >
            <Link to={"/home"}>Home</Link>
          </div>
          <div>
            <Link to={"/animes"}>Series</Link>{" "}
          </div>
          <div>
            <CiSearch
              className="cursor-pointer"
              onClick={() => setVal(false)}
            />
          </div>
          
            <div className="sm:block hidden">
            <Link to={"/watchlist"}>
              <CiBookmark />
              </Link>
            </div>
          
          <Link to={"/dashboard"}>
            <div>
              <CiUser />
            </div>{" "}
          </Link>
        </div>
      </div>
      <div
        className={`${
          val
            ? "flex gap-10 transform duration-700 w-full py-6 items-center justify-between absolute top-[-20%] z-10 px-10"
            : "flex gap-10 w-full transform duration-700 py-6 items-center justify-between absolute top-0 z-10 px-10"
        } `}
      >
        <div className="w-full">
          <input
            className="border w-full  rounded-lg px-8 py-3  text-white font-semibold"
            type="text"
            placeholder="Search Anime"
            onChange={(e) => setAnimeName(e.target.value)}
          />
        </div>{" "}
        <div>
          <button
            className="search-btn sm:py-3 py-2 sm:gap-2 gap-0 justify-center bg-[#f00070] font-semibold text-black sm:rounded-md rounded-full sm:w-40 w-10  flex items-center "
            onClick={search}
          >
            <CiSearch className=" text-2xl  bg-transparent " />
            <p className="sm:text-white sm:bg-transparent hidden">Search</p>
          </button>
        </div>
        <div>
          <RxCross2
            onClick={() => setVal(true)}
            className="text-white sm:text-2xl text-lg cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};
