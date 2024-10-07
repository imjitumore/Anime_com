import React, { useEffect, useState } from 'react';

export const Fetch = () => {
 
  return (
    <div className='grid grid-cols-5 my-5'>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="anime-item text-white  my-5"> 
            <img className='h-[300px]' src={`http://localhost:4000/${item.image}`} alt={item.image} /> 
            <p className='font-semibold'>{item.name}</p>
            <p>{item.rating}</p>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};
