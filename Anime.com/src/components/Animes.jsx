import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export const Animes = ({ data }) => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };

  return (
    <>
      <Navbar />
      <div className="my-10">
        <div className="text-white font-semibold text-xl px-4">
            <p>Filtered By</p>
        </div>
        <div className=" anime-gird grid sm:grid-cols-5 grid-cols-2  px-4 w-full " onClick={scrollToTop}>
          {data.map((item, i) => {
            console.log(item.category)
            return (
              <>
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>  
                <Card
                  image={item.image}
                  name={item.name}
                  language={item.language}
                />
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
