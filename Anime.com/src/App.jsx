import { useEffect, useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Animes } from './components/Animes'
import {BrowserRouter, Form, Navigate, Route, Routes} from "react-router-dom"
import { AnimeInfo } from './components/AnimeInfo'
import { TMDB } from './components/TMDB'
import { Fetch } from './components/Fetch'
import { Formfill } from './components/Formfill'
import Login from './components/Login'
 import SignUp from './components/SignUp'
import { Watchlist } from './components/Watchlist'

import { Dashboard } from './components/Dashboard'
import PrivateRoute from './components/Privateroute'

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling
  // const [loading, setLoading] = useState(true); // Added state for loading status

  const result = async () => {
    try {
      const resp = await fetch("http://localhost:4000/api/getanimes", {
        method: "GET",
        headers: { "Content-Type": "application/json" }, // Fixed header typo
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
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


  
  // if (loading) return <p>Loading...</p>; // Show loading state
  // if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
           <Route path="*" element={<Navigate to="/login" />} /> 
          <Route path='/home' element={<Home dataa={animeData}/> } />
          <Route path='/animes' element={<Animes data={animeData}/>} />
          <Route path='/card' element={<Animes data={animeData}/>} />
          <Route path='/watchlist' element={<Watchlist data={animeData}/>} />
          <Route path='/animeinfo/name/:name/category/:category' element={<AnimeInfo data={animeData}/>} />
           <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }></Route> 
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
