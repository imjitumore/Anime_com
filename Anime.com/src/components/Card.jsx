import React from 'react'
export function Card(props) {
    return (
      <>
        <div className="my-4 text-white relative group">
          <div className="flex flex-col w-full cursor-pointer rounded-lg px-2">
            <div className='group overflow-hidden'>
            <img className='w-full hover:scale-110 transition-all duration-300 ease-in-out' src={`https://anime-com-backend.onrender.com/${props.image}`} alt={props.image} /> 
            </div>
            <p className="font-semibold text-wrap py-2 pr-4">{props.name}</p>
            <p className="text-sm">{props.language}</p>
          </div>
        </div>
      </>
    );
  }
  
