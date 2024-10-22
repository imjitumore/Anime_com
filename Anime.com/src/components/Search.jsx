import { Link, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

export const Search = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [animeName, setAnimeName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name");
    setAnimeName(name);
  }, [location.search]);

  useEffect(() => {
    if (animeName) {
      fetch("https://anime-backend-u76a.onrender.com/api/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name: animeName }),
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [animeName]);
  return (
    <>
      <Navbar />
      <div className="text-white mt-10 px-4 w-full">
        <h1 className="text-white sm:text-3xl text-2xl font-semibold px-4">Searched Items:</h1>
        <div className="sm:my-8 my-5 text-white relative group grid sm:grid-cols-5 grid-cols-2 ">
        {data.map((item) => {
          return (
            <>
              <Link to={`/animeinfo/name/${item.name}/category/${item.category}`}>  
              <div className="flex flex-col w-full cursor-pointer rounded-lg px-2">
                <div className="group overflow-hidden">
                  <img
                    className=" w-full hover:scale-110 transition-all duration-300 ease-in-out"
                    src={`https://anime-backend-u76a.onrender.com/${item.image}`}
                    alt={item.image}
                  />
                </div>
                <p className="font-semibold text-wrap py-2 ">
                  {item.name}
                </p>
                <p className="text-sm">{item.language}</p>
              </div>
              </Link>
            </>
          );
        })}
        </div>
      </div>
    </>
  );
};
