import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar2 = () => {
  return (
    <>
        <div className='nav-main flex justify-center gap-10 my-10 w-full '>
        <Link to={"/login"}> <button className="nav-btn  py-2  bg-[#05eded] font-semibold text-black rounded-md w-60">Login</button></Link>
        <Link to={"/signup"}><button className=" nav-btn py-2  bg-[#f00070] font-semibold text-black rounded-md w-60">SignUp</button></Link>
        </div>
    </>
  )
}
