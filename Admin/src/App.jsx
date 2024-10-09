import { useState,useEffect } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Dashboard } from './components/Dashboard'
import { AnimeDetails } from './components/AnimeDetails'

function App() {


  const [animeAata, setAnimeData] = useState([]);
  const result = async () => {
    try {
      const resp = await fetch(
        "https://anime-com-backend.onrender.com/api/getanimes",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }, // Fixed header typo
        }
      );

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }

      const docu = await resp.json();
      setAnimeData(docu);
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  useEffect(() => {
    result();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard data={animeAata}/>} />
          <Route path='/animeDetails/name/:name' element={<AnimeDetails data={animeAata}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
