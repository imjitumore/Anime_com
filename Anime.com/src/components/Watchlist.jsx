import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'

export const Watchlist = ({ data }) => {

    const [watchdata,setWatchlist]= useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (user && user.userId) {
          fetch(`https://anime-com-backend.onrender.com/api/getwatchlist/${user.userId}`)
            .then((response) => {
              // if (!response.ok) {
              //   throw new Error('Failed to fetch watchlist');
              // }
              return response.json();
            })
            .then((data) => setWatchlist(data))
            .catch((error) => console.error("Error fetching watchlist:", error));
        } else {
          console.error("User not found in localStorage");
        }
      }, []); 

      function deleteAnime(name) {
        const userId = JSON.parse(localStorage.getItem("user"))
        fetch(`https://anime-com-backend.onrender.com/api/removeAnime/${userId.userId}/${name}`,
          {
            method: "DELETE",
            headers: { "Contect-type": "application/json" },
            body: JSON.stringify({ name })
          }
        ).then(response => response.json()).then(()=>{
          fetch("https://anime-com-backend.onrender.com/api/getwatchlist").then(resp=>resp.json()).then(data=>setWatchlist(data))
        })
      }
    console.log(data)
    return (
        <>
            <Navbar />
            <div className='text-5xl font-semibold text-white text-center my-10'>MY Watch List</div>
            <div className='grid grid-cols-2 gap-4 py-8 mx-10'>
                {watchdata.map((item, i) => {
                    return (
                        <>

                                <div className='flex my-2 justify-between gap-2 '>
                                    <div>
                                        <img className='text-white w-40' src={`https://anime-com-backend.onrender.com/${item.image}`} alt={item.image} />
                                    </div>
                                    <div className='text-white w-full text-2xl font-semibold'>{item.name}</div>
                                    <div>
                                    <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>

                                        <button className='bg-[#00f2f2] py-2 px-6 font-semibold rounded-lg'>Visit Anime</button>
                                    </Link>
                                        <button onClick={() => deleteAnime(item.name)} className='bg-[#f00079] py-2 px-10 my-2 font-semibold rounded-lg'>Remove</button>
                                    </div>
                                </div>
                            
                        </>
                    )
                })}
            </div>
        </>
    )
}
