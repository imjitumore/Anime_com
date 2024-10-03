import React, { useEffect, useState } from 'react'

export const TMDB = () => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
    const[data,setData]=useState([])

        fetch("https://api.themoviedb.org/3/discover/movie?api_key=41d2afebb022a4417e23bbb036d7a617&with_genres=16&with_original_language=ja").then(rep=>rep.json()).then(data=>setData(data.results))

    console.log(data)
  return (
    <>
        {data.map((item,i)=>{
            return(
                <>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.map(movie => (
                    <div key={movie.id} style={{ margin: '10px' }}>
                        <h3>{movie.title}</h3>
                        {movie.poster_path ? (
                            <img 
                                src={`${imageBaseUrl}${movie.poster_path}`} 
                                alt={movie.title} 
                                style={{ width: '200px', height: 'auto' }}
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                    </div>
                ))}
                </div>             
                </>
            )
        })}
    </>
  )
}
