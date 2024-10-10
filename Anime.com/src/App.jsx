import { useEffect, useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { Animes } from './components/Animes'
import {BrowserRouter, Form, Navigate, Route, Routes} from "react-router-dom"
import { AnimeInfo } from './components/AnimeInfo'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Watchlist } from './components/Watchlist'
import { Dashboard } from './components/Dashboard'
import  PrivateRoute  from './components/PrivateRoute'
import { Search } from './components/Search'
import { Main } from './components/Main'

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling
  // const [loading, setLoading] = useState(true); // Added state for loading status

  const result = async () => {
    try {
      const resp = await fetch("https://anime-com-backend.onrender.com/api/getanimes", {
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

  const user = localStorage.getItem('user');
  
  // if (loading) return <p>Loading...</p>; // Show loading state
  // if (error) return <p>Error: {error}</p>; // Show error message

  // const [login ,setlogin]=useState(()=>{
  //   return JSON.parse(localStorage.getItem('user'));
  // })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login  />} />
          <Route path="/" element={<Main  />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="" element={!user?<Navigate to="/main" />:<Navigate to={"/home"}/>} />  */}
          <Route path='/home' element={user?< Home dataa={animeData}/>:<Navigate to={"/main"}/>}></Route>
          <Route path='/animes' element={user?<Animes data={animeData}/>:<Navigate to={"/main"}/>} />
          <Route path='/card' element={<Animes data={animeData}/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/watchlist' element={<Watchlist data={animeData}/>} />
          <Route path='/animeinfo/name/:name/category/:category' element={<AnimeInfo data={animeData}/>} />
           <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard data={animeData}  />
            </PrivateRoute>
          }></Route> 
      </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
