import React from 'react'
export function Card2(props) {
    return (
      <>
        <div className=" gap-2 my-2  text-white">
          <div className="flex flex-col w-full cursor-pointer pr-3 rounded-lg ">
            <div className='group overflow-hidden'>
            <img className=' hover:scale-110 transition-all duration-300 ease-in-out' src={props.image} alt={props.image} /> 
            </div>
            <p className="font-semibold sm:w-60 w-48 text-wrap py-2">{props.name}</p>
            <p className="text-sm">{props.language}</p>
          </div>
        </div>
      </>
    );
  }
  