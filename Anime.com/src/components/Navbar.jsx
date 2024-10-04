import React from 'react'
import { CiUser,CiSearch,CiBookmark } from "react-icons/ci";
import logo from "/logo.png"
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <>
        <div className='grid grid-cols-3 justify-between px-10 py-1 items-center text-white shadow-md'>
          <div><Link to={"/home"}><img className='h-12 ' src={logo} alt="" /></Link></div>
          <div>
            <ul className='flex justify-around text-lg cursor-pointer'>
              <li><Link to={"/home"}>Home</Link></li>
              <li><Link to={"/animes"}>Series</Link> </li>
              <li>News</li>
            </ul>
          </div>
          <div className='flex justify-end gap-8 font-bold text-2xl'>
              <div><CiSearch /></div>
             <Link to={"/watchlist"}><div><CiBookmark /></div></Link>
             <Link to={"/dashboard"}><div><CiUser /></div> </Link>
            </div>
        </div>
    </>
  )
}
