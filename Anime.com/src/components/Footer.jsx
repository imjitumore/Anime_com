import React from 'react'
import logo from "/logo.png"
import { CiExport, CiFacebook, CiInstagram, CiTwitter, CiYoutube } from 'react-icons/ci'

export const Footer = () => {
  return (
    <>
    <hr className='text-white my-2' />
    <div className='grid grid-cols-4 my-10'>
        <div className='sm:px-10 px-3 py-10'>
            <img src={logo} alt="" />
        </div>
        <div className='text-white'>
            <p className='sm:text-lg text-[15px] font-semibold  py-2'>Nevigation</p>
            <ul className='sm:text-md text-[10px]'>
                <li>Latest</li>
                <li>Pupular</li>
                <li>Adventure</li>
                <li>News</li>
                <li>Charactors</li>
            </ul>
        </div>
        <div className='text-white'>
           <p className='sm:text-lg text-[15px] font-semibold py-2'>Connect with us</p>
           <ul className='sm:text-md text-[10px]'>
            <li className='flex items-center gap-2'><CiInstagram/> Instagram</li>
            <li className='flex items-center gap-2'><CiFacebook/> Facebook</li>
            <li className='flex items-center gap-2'><CiYoutube/> Youtube</li>
            <li className='flex items-center gap-2'><CiTwitter/> x</li>
           </ul>
        </div>
        <div className='text-white'>
            <p className='sm:text-lg text-[15px] font-semibold py-2'>Anime.com</p>
            <ul className='sm:text-md text-[10px]'>
                <li>About</li>
                <li>Help Center</li>
                <li>Terms and Conditions</li>
                <li>Privay Policy</li>
            </ul>
        </div>
    </div>
    <hr className='text-white my-2' />
    <p className='sm:text-xl text-[10px] text-center text-white py-4'>Copyright © 2024 Anime.com. All Rights Reserved.</p>
    </>
  )
}
