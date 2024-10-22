import React,{useState} from 'react'
import { Navbar } from './Navbar';

export const AddAnime = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [seasons, setSeasons] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [year, setyear] = useState("");
  const [duration, setduration] = useState("");
  const [youtube, setYoutube] = useState("");
  const [stars, setStars] = useState("");


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

  function addNewAnime()
  {
    const add = async () => {
        const response = await fetch(
          `http://localhost:4000/api/addAnime`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              bgImage:"",
              image:"",
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
            clearTextBox()
        }
        const data = await response.json();
        console.log(data);
      };
      add();
  }
  return (
    <>
        <Navbar/>
        <div className='pt-24 py-4'>
        <div className="flex justify-between items-center border rounded-xl px-4 mx-4 bg-[#232323]">
          <p className="text-white text-2xl font-semibold  bg-transparent">
            ADD NEW ANIME
          </p>
          <div className="bg-transparent py-2">
            <button
              className="py-2  bg-[#28d528] font-semibold text-white  rounded-md w-48 mx-2 my-3  bg-transparent "
              type="submit"
              onClick={addNewAnime}
            >
               Add Anime
            </button>
            <button
              className="py-2  bg-[red] font-semibold text-white  rounded-md w-48 mx-4 my-3  "
              type="submit"
              onClick={clearTextBox}
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
  )
}
