import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export const Watchlist = ({ data }) => {
  const [watchdata, setWatchlist] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("user");
  
    // Check if user data is available and parse it correctly
    if (user) {
      try {
        const userData = typeof user === "string" ? JSON.parse(user) : user;
        if (userData && userData.userId) {
          fetch(
            `https://anime-com-backend.onrender.com/api/getwatchlist/${userData.userId}`
          )
            .then((response) => response.json())
            .then((data) => setWatchlist(data))
            .catch((error) => console.error("Error fetching watchlist:", error));
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    } else {
      console.error("User not found in localStorage");
    }
  }, []);
  

  function deleteAnime(name) {
    const userId = JSON.parse(localStorage.getItem("user"));
    fetch(
      `https://anime-com-backend.onrender.com/api/removeAnime/${userId.userId}/${name}`,
      {
        method: "DELETE",
        headers: { "Contect-type": "application/json" },
        body: JSON.stringify({ name }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetch("https://anime-com-backend.onrender.com/api/getwatchlist")
          .then((resp) => resp.json())
          .then((data) => setWatchlist(data));
      });
  }
  console.log(data);
  return (
    <>
      <Navbar />
      <div className="sm:text-5xl text-2xl font-semibold text-white text-center sm:my-10 my-6">
        MY Watch List
      </div>
      <div className="grid sm:grid-cols-2 gap-6 py-8 mx-10">
        {watchdata.map((item, i) => {
          return (
            <>
              <div className="flex sm:my-2 justify-between gap-2 ">
                <div>
                  <img
                    className="text-white w-40"
                    src={`https://anime-com-backend.onrender.com/${item.image}`}
                    alt={item.image}
                  />
                </div>
                <div className="text-white w-full sm:text-xl text-sm font-semibold">
                  {item.name}
                </div>
                <div>
                  <Link
                    to={`/animeinfo/name/${item.name}/category/${item.category}`}
                  >
                    <button className="bg-[#00f2f2] sm:text-[16px] text-[12px]  py-2 sm:px-4 px-2  font-semibold rounded-lg">
                      Visit Anime
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteAnime(item.name)}
                    className="bg-[#f00079] sm:text-[16px] text-sm  sm:py-2 py-1.5 sm:px-8 px-4 my-2 font-semibold rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
