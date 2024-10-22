import React from 'react'
import { FaPlay } from 'react-icons/fa'

export const Advertise = (props) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };
  return (
    <>
        <hr />
        <div className='grid sm:grid-cols-2 px-8 text-white gap-6 my-10' onClick={scrollToTop}>
            <div>
                <img src={`https://anime-com-backend.onrender.com/${props.image}`} alt="" />
            </div>
            <div className='px-2'>
                <p className='sm:text-4xl text-2xl py-2'>{props.name}</p>
                <p className='text-[#bfb5b5f2] text-sm'>{props.language}</p>
                <p className='text-[#bfb5b5f2] text-sm'>{props.rating}</p>
                <p className='pr-8 my-2 sm:text-md text-sm'>{props.summary}</p>
                <div className="bg-transparent">
                      <button className="flex bg-[#E86229] text-white font-semibold items-center gap-2 py-2 my-3 sm:px-8 px-6 border-[#E86229]">
                        <FaPlay className="bg-transparent" />
                        Watch Now
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
