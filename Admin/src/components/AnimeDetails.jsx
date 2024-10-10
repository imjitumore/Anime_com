import React, { useState, useEffect, useRef } from "react";
import { FaBookmark } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export const AnimeDetails = ({ data }) => {
  const [anime, setAnime] = useState();
  const { name } = useParams();
  const [val, setVal] = useState(true);
  const [state, setState] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (data.length > 0) {
      const findAnime = data.find((item) => item.name === name);
      setAnime(findAnime);
    }
    console.log(anime);
  }, [name, anime]);

  if (!anime) {
    return <p className="text-white">Loading..</p>;
  }


  async function deleteAnime(animeNAme) {
    try {
      const response = await fetch("https://anime-com-backend.onrender.com/api/deleteAnime", {
        method: "DELETE",
        headers: { "Content-type": "application/json" }, // Fixed typo
        body: JSON.stringify({ name: animeNAme }) // Sending the anime name in the request body
      });
      alert("Anime Deleted From Collection")
      if(response.ok)
      {
        navigate("/dashboard")
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div>
        <div>
          <img
            className="w-full"
            src={`https://anime-com-backend.onrender.com/${anime.bgimage}`}
            alt=""
          />
        </div>
        <div>
          <div className="my-4 px-4 flex w-full gap-4">
            <img
              className="h-[500px]"
              src={`https://anime-com-backend.onrender.com/${anime.image}`}
              alt=""
            />
            <div className="bg-transparent w-full">
              <iframe
                className="w-full h-[500px] "
                src={`https://www.youtube.com/embed/${anime.youtube}`}
                title="YouTube video player"
                frameBorder="0" // Add frameBorder attribute
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="px-4 text-white">
          <p className="text-white font-semibold text-4xl">{anime.name}</p>
          <div className="flex gap-20 my-6">
            <div>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Language:</span>{" "}
                {anime.language}
              </p>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Rating:</span> {anime.rating}
              </p>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Release Year:</span>{" "}
                {anime.releaseyear}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Seasons:</span> {anime.seasons}
              </p>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Episodes:</span>{" "}
                {anime.episodes}
              </p>
              <p className="text-lg font-semibold py-1">
                <span className="text-[#fe6a13]">Duration:</span>{" "}
                {anime.duration}
              </p>
            </div>
          </div>
          <div className="w-full my-8">
            <p className="text-center text-3xl font-semibold text-[#fe6a13]">
              Summary:{" "}
            </p>
            <p className="text-lg py-2 font-semibold">{anime.summary}</p>
          </div>
        </div>
        <div className="flex justify-start  my-6">
          <button
            onClick={() => {
              setState(true);
            }}
            className="py-2  bg-[#7605f7] font-semibold text-white  rounded-md w-72 mx-4 my-3 "
            type="submit"
          >
            Update Details
          </button>
          <button
            onClick={()=>deleteAnime(anime.name)}
            className="py-2  bg-[red] font-semibold text-white  rounded-md w-72 mx-4 my-3  "
            type="submit"
          >
            Delete Anime
          </button>
        </div>

        <div ref={formRef}>{state ? <UpdateForm anime={anime} /> : ""}</div>
      </div>
    </>
  );
};

function UpdateForm({ anime }) {
  const [name, setName] = useState(anime.name);
  const [summary, setSummary] = useState(anime.summary);
  const [rating, setRating] = useState(anime.rating);
  const [language, setLanguage] = useState(anime.language);
  const [seasons, setSeasons] = useState(anime.seasons);
  const [episodes, setEpisodes] = useState(anime.episodes);
  const [year, setyear] = useState(anime.releaseyear);
  const [duration, setduration] = useState(anime.duration);
  const [youtube, setYoutube] = useState(anime.youtube);
  const [stars, setStars] = useState(anime.stars);

  function updateFields() {
    const update = async () => {
      const response = await fetch(
        `https://anime-com-backend.onrender.com/api/updateAnime/${anime.name}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: name,
            rating: rating,
            language: language,
            seasons: seasons,
            episodes: episodes,
            releaseyear: year,
            duration: duration,
            youtube: youtube,
            stars: stars,
            summary: summary,
          }),
        }
      );
      if(response.ok)
      {
        alert("Data Updated Successfully...!")
        clearTextBox()
      }
      const data = await response.json();
      console.log(data);
    };
    update();
  }

  function clearTextBox() {
    setName("");
    setRating("");
    setEpisodes("");
    setLanguage("");
    setSeasons("");
    setStars("");
    setSummary("");
    setYoutube("");
    setduration("");
    setyear("");
  }
  return (
    <>
      <div className="border-y-2 py-10">
        <div className="flex justify-between items-center border rounded-xl px-4 mx-4 bg-[#232323]">
          <p className="text-white text-2xl font-semibold  bg-transparent">
            Update Details
          </p>
          <div className="bg-transparent py-2">
            <button
              onClick={updateFields}
              className="py-2  bg-[#20b620] font-semibold text-white  rounded-md w-48 mx-2 my-3  bg-transparent "
              type="submit"
            >
              Update Details
            </button>
            <button
              onClick={clearTextBox}
              className="py-2  bg-[red] font-semibold text-white  rounded-md w-48 mx-4 my-3  "
              type="submit"
            >
              Discard Changes
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="text-white border my-4 ml-4 rounded-lg px-4 py-4 bg-[#232323] w-full">
            <p className="text-xl font-semibold bg-transparent mb-3">
              General Informartion
            </p>
            <div className="bg-transparent">
              <p className="bg-transparent text-lg font-semibold my-2">
                Anime Name
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Anime Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <p className="bg-transparent text-lg font-semibold my-2">
                Summary
              </p>
              <textarea
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                placeholder="Enter Anime summary"
                name=""
                id=""
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="text-white border my-4 mx-4 rounded-lg px-4 py-4 bg-[#232323]">
            <p className="text-xl font-semibold bg-transparent mb-3">
              Anime Media
            </p>
            <div className="bg-transparent flex w-full gap-4 text-center font-semibold">
              <p className="border my-2  rounded-lg px-4 py-4  bg-transparent w-52">
                Select Background Image
              </p>
              <p className="border my-2 rounded-lg px-4 py-4 bg-transparent w-52">
                Select Main Image
              </p>
            </div>
          </div>
        </div>
        <div className="text-white border mx-4 rounded-lg px-4 py-4 bg-[#232323]">
          <p className="text-xl font-semibold bg-transparent mb-3">Pricing</p>
          <div className="bg-transparent flex gap-4">
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Rating
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Language
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">Stars</p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Language"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Seasons
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Seasons"
                value={seasons}
                onChange={(e) => setSeasons(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-transparent flex gap-4 w-full my-5">
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Episodes
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Episodes"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
              />
            </div>
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Release Year
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Release Year"
                value={year}
                onChange={(e) => setyear(e.target.value)}
              />
            </div>
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Duration
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Duration"
                value={duration}
                onChange={(e) => setduration(e.target.value)}
              />
            </div>
            <div className="bg-transparent w-full">
              <p className="text-lg font-semibold bg-transparent mb-3">
                Video Link
              </p>
              <input
                className="bg-transparent border-2 py-2 px-3 w-full rounded-md  font-semibold"
                type="text"
                placeholder="Enter Duration"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
