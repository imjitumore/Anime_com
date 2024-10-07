import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { Card } from "./Card";
import { Footer } from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiGlass } from "react-icons/ci";

export const AnimeInfo = ({ data }) => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  const [anime, setAnime] = useState(null);
  const [seriesCategory, setSeriesCategory] = useState(null);
  const { name } = useParams();
  const { category } = useParams();
  console.log(seriesCategory);
  useEffect(() => {
    if (data.length > 0) {
      const findAnime = data.find((item) => item.name === name);
      setAnime(findAnime);
    }

    console.log(anime);
  }, [name, anime]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };

  async function watchList() {
    console.log("function called");
    const userId = JSON.parse(localStorage.getItem("user"))
    console.log(userId)
    try {
      const response = await fetch(`http://localhost:4000/api/watchlist/${userId.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime),
      });

      if (!response.ok) {
        throw new Error('Failed to add to watchlist');
      }

      const result = await response.json();
      console.log("Watchlist response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    setSeriesCategory(data.filter((item) => item.category === category));
  }, [data]);
  console.log(seriesCategory);
  return (
    <>
      <Navbar />
      {!anime ? (
        "Loading"
      ) : (
        <div className="text-white group overflow-hidden h-full">
          <img className='  w-full' src={`https://anime-com-backend.onrender.com/${anime.bgimage}`} alt={anime.image} />
          <div className="flex px-10 gap-10 w-100%">

            <div className=" w-[70%] mt-20">
              <div className="bg-transparent">
                <iframe
                  className="w-full h-[400px] "
                  src={`https://www.youtube.com/embed/${anime.youtube}`}
                  title="YouTube video player"
                  frameBorder="0" // Add frameBorder attribute
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-5xl py-5 font-semibold  w-full">
                {anime.name}
              </p>
              <button onClick={watchList} className="flex bg-[#E86229] text-white font-semibold items-center gap-2 py-2 my-3 px-6 border-[#f6baa1]">
                <FaBookmark className="bg-transparent" />
                Add To WatchList
              </button>
              <p className="text-lg font-semibold py-1">
                Language: {anime.language}
              </p>
              <p className="text-lg font-semibold py-1">
                Rating: {anime.rating}
              </p>
              <p className="text-lg font-semibold py-1">
                Release year: {anime.releaseyear}
              </p>
              <p className="text-lg font-semibold py-1">Stars: {anime.stars}</p>
              <p className="text-lg font-semibold py-1">
                Seasons: {anime.seasons}
              </p>
              <p className="text-lg font-semibold py-1">
                Episodes:{anime.episodes}
              </p>
              <p className="text-lg font-semibold py-1">
                Duration: {anime.duration}
              </p>
              <p className="text-lg font-semibold py-1">{anime.duration}</p>
              <div className="w-full">
                <p className="text-center text-3xl font-semibold">Summary: </p>
                <p className="text-lg py-2">{anime.summary}</p>
              </div>
            </div>
            <div className="">
              <img className="pt-20" src={`https://anime-com-backend.onrender.com/${anime.image}`} alt={anime.image} />
            </div>
          </div>
        </div>
      )}
      <hr className="my-4" />
      <div className="my-20">
        <p className="text-3xl font-semibold text-white px-4 my-3">
          Related Series:
        </p>
        <div className=" px-1">
          <Slider {...settings}>
            {seriesCategory && seriesCategory.length > 0 ? (
              seriesCategory.slice(0, 12).map((item) => (
                <Link
                  to={`/animeinfo/name/${item.name}/category/${item.category}`}
                  key={item.name}
                >
                  <div className="" onClick={scrollToTop}>
                    <Card
                      image={item.image}
                      name={item.name}
                      language={item.language}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <p>No related series found</p>
            )}
          </Slider>
        </div>
      </div>

      <div className="my-20" >
        <div className="">
          <p className="text-3xl font-semibold text-white px-4 my-3">
            You Might Aslo Like
          </p>
        </div>
        <div className="grid grid-cols-5" >
          {data.slice(50, 60).map((item, i) => {
            return (
              <Link
                to={`/animeinfo/name/${item.name}/category/${item.category}`}
              >
                <div className="" onClick={scrollToTop} >
                  <Card
                    image={item.image}
                    name={item.name}
                    language={item.language}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center my-4">
          <Link to={"/animes"}>
            <button className="flex bg-[#E86229] text-white font-semibold items-center gap-2 py-2 my-3 px-8 border-[#2c1e18]" onClick={scrollToTop}>
              <FaPlay className="bg-transparent" />
              View All Animes
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
