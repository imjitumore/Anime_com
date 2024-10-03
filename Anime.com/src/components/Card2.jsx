import React from 'react'
export function Card2(props) {
    return (
      <>
        <div className=" gap-2 my-2  text-white">
          <div className="flex flex-col w-full cursor-pointer px-1 rounded-lg ">
            <div className='group overflow-hidden'>
            <img className='h-[380px] hover:scale-110 transition-all duration-300 ease-in-out' src={props.image} alt={props.image} /> 
            </div>
            <p className="font-semibold w-60 text-wrap py-2 pr-4">{props.name}</p>
            <p className="text-sm">{props.language}</p>
          </div>
        </div>
      </>
    );
  }
  