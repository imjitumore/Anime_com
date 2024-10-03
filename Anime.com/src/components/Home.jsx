import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { FaPlay } from "react-icons/fa";
import "../style/home.css";
import Slider from "react-slick";
import advertisement from "/failureframe.jfif";
import advertisement2 from "/adver.png";
import { Footer } from "./Footer";
import { Card } from "./Card";
import { Advertise } from "./Advertise";
import { Link } from "react-router-dom";
import { Card2 } from "./Card2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const Home = ({ dataa }) => {
  const settingss = {
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };

  const [lovelydata, setLovelyData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("slider.json")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, [data]);

  useEffect(() => {
    fetch("lovlyseries.json").then((res) =>
      res.json().then((data) => setLovelyData(data))
    );
  }, [lovelydata]);

  return (
    <>
      <Navbar />
      <div className="shadow-2xl w-[100%]">
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <>
                <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}        >
                  <div className="slider">
                    <img
                      className="slider w-full h-[630px] object-cover relative "
                      src={item.image}
                      alt=""
                    />
                    <div className="absolute z-1 top-0 bg-[transparent] px-20 py-10 ">
                      <img
                        className="w-56 bg-[transparent]"
                        src={item.logo}
                        alt=""
                      />
                      <p className="text-[white] py-2 pt-8 bg-[transparent] font-bold text-xl">
                        {item.language}
                      </p>
                      <p className="text-[white] font-semibold py-2 w-96 text-lg bg-[transparent] ">
                        {item.Description}
                      </p>
                      <div className="bg-transparent">
                        <button className="flex bg-[#E86229] text-white font-semibold items-center gap-2 py-2 my-3 px-8 border-[#E86229]">
                          <FaPlay className="bg-transparent" />
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </Slider>
      </div>
      <div className="my-10">
        <p className="text-3xl text-white px-6 my-3 font-semibold">
          Stream the First Season for Free!
        </p>
        <p className="px-6 text-white py-1">
          Check out some of our most popular titles here
        </p>
        <div className=" w-full flex px-1">
          <Freeanime />
        </div>
      </div>

      <div className="my-10 ">
        <p className="text-3xl text-white px-6 my-3 font-semibold">
          Popular In India
        </p>
        <p className="px-6 text-white py-1">
          Check out some of our most popular titles here
        </p>
        <div className=" w-full flex px-4 overflow-x-auto ">
          <PopularIndia />
        </div>
      </div>
      <div className="w-[95%] mx-auto my-10 flex justify-center items-center">
        <img className="cursor-pointer" src={advertisement} alt="" />
      </div>

      <div>
        <p className="text-3xl text-white px-6 my-3 font-semibold">
          Lovely Series
        </p>
        <p className="px-6 text-white py-1">
          Check out some of our most popular titles here
        </p>
        <div className="flex overflow-x-auto w-full gap-1 px-4" onClick={scrollToTop}>
          {lovelydata.map((item) => {
            return (
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
                <Card2
                  image={item.image}
                  name={item.name}
                  language={item.language}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        {dataa.slice(73,75).map((item, i) => {
          return (
            <>
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
                <Advertise
                  image={item.bgimage}
                  name={item.name}
                  language={item.language}
                  rating={item.rating}
                  summary={item.summary}
                />
              </Link>
            </>
          )
        })}
        <hr />
      </div>

      <div className="py-4">
        <p className="text-3xl text-white px-6 my-3 font-semibold">
          Popular Animes
        </p>
        <p className="px-6 text-white py-1">
          Check out some of our most popular titles here
        </p>
        <div className="px-4" onClick={scrollToTop}>
          <Slider {...settingss}>
          {dataa.slice(70,82).map((item) => {
            return (
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
                <Card
                  image={item.image}
                  name={item.name}
                  language={item.language}
                />
              </Link>
            );
          })}
          </Slider>
        </div>
      </div>
      <div className="w-[95%] mx-auto my-10 flex justify-center items-center">
        <img className="cursor-pointer" src={advertisement2} alt="" />
      </div>

      <Footer />
    </>
  );
};

function PopularIndia() {
  const [indiaanime, setIndiaAnime] = useState([]);
  useEffect(() => {
    fetch("indiapopularanime.json")
      .then((resp) => resp.json())
      .then((data) => setIndiaAnime(data));
  }, [indiaanime]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };
  return (
    <>
      <div className=" flex justify-center gap-2 my-2  text-white" onClick={scrollToTop}>
        {indiaanime.map((item, i) => {
          return (
            <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
              <div className="flex flex-col w-[full] cursor-pointer px-1 rounded-lg">
                <img key={i} className="" src={item.image} alt="item.image" />
                <p className="font-semibold w-60 py-2 pr-4">{item.name}</p>
                <p className="text-sm">{item.language}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
function Freeanime() {
  const [freeanime, setFreeAnime] = useState([]);

  useEffect(() => {
    fetch("freeanime.json")
      .then((resp) => resp.json())
      .then((data) => setFreeAnime(data));
  }, [freeanime]);
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow:5,
    slidesToScroll: 2,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };
  return (
    <>
      <div className="justify-center my-2   text-white w-full" onClick={scrollToTop}>
        <Slider {...settings} >
          {freeanime.map((item, i) => {
            return (
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>
                <div className="flex flex-col cursor-pointer pl-4">
                  <img
                    key={i}
                    className="h-[355px]"
                    src={item.image}
                    alt="item.image"
                  />
                  <p className="font-semibold w-60 py-1">{item.name}</p>
                  <p className="text-sm">{item.language}</p>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

