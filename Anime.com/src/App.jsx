import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./components/Home";
import { Animes } from "./components/Animes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimeInfo } from "./components/AnimeInfo";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Watchlist } from "./components/Watchlist";
import { Dashboard } from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Search } from "./components/Search";
import { Main } from "./components/Main";

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [error, setError] = useState(null);

  // Retrieve user from localStorage and parse it to an object if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Fetch anime data
  const fetchAnimeData = async () => {
    try {
      const resp = await fetch(
        "https://anime-com-backend.onrender.com/api/getanimes",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }

      const docu = await resp.json();
      setAnimeData(docu);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, []); // Run only once on component mount

  useEffect(() => {
    // Only store in localStorage if the user is not null
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Correctly stringify the user object
    }
  }, [user]);

  console.log("User:", user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page: Accessible to all */}
        <Route path="/home" element={<Home dataa={animeData} />} />

        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login setUserr={setUser} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/animes"
          element={user ? <Animes data={animeData} /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/login" />}
        />
        <Route
          path="/watchlist"
          element={user ? <Watchlist data={animeData} /> : <Navigate to="/login" />}
        />
        <Route
          path="/animeinfo/name/:name/category/:category"
          element={user ? <AnimeInfo data={animeData} /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard data={animeData} setUserr={setUser} /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
