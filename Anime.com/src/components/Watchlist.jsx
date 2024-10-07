import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'

export const Watchlist = ({ data }) => {

    const [watchdata,setWatchlist]= useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (user && user.userId) {
          fetch(`http://localhost:4000/api/getwatchlist/${user.userId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch watchlist');
              }
              return response.json();
            })
            .then((data) => setWatchlist(data))
            .catch((error) => console.error("Error fetching watchlist:", error));
        } else {
          console.error("User not found in localStorage");
        }
      }, []); 

    console.log(data)
    return (
        <>
            <Navbar />
            <div className='text-5xl font-semibold text-white text-center my-10'>MY Watch List</div>
            <div className='grid grid-cols-2 gap-4 py-8'>
                {watchdata.map((item, i) => {
                    return (
                        <>
                            <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>

                                <div className='flex my-2 justify-between gap-2 mx-10 '>
                                    <div>
                                        <img className='text-white h-36 ' src={`https://anime-com-backend.onrender.com/${item.image}`} alt={item.image} />
                                    </div>
                                    <div className='text-white w-60 text-2xl font-semibold'>{item.name}</div>
                                    <div>
                                        <button className='bg-[#00f2f2] py-2 px-10 font-semibold rounded-lg'>Visit Anime</button>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                })}
            </div>
        </>
    )
}
