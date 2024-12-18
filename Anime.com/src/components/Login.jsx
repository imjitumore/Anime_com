import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "/signup.png";
import login from "/login.webp";
import { Navbar2 } from "./Navbar2";

const Login = ({ setUserr }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To redirect the user after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await fetch(
        "https://anime-com-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json(); // Parse the response to JSON
      console.log("Response data:", data);

      if (!response.ok) {
        // If the response is not OK, display the server's error message
        setError(data.message || "Failed to login. Please check your credentials.");
      } else {
        // On success, store the user data in localStorage and set it in the parent component
        localStorage.setItem("user", JSON.stringify(data));
        setUserr(data); // Pass the user data to the parent component (without stringifying)
        navigate("/home"); // Redirect to the home page
      }
    } catch (err) {
      // Catch network or other errors
      console.error("Error during login:", err);
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="login-main w-full flex justify-center h-full">
        <div className="">
          <img className="login-img h-[400px]" src={login} alt="Login" />
        </div>
        <div className="login-container text-white px-8 font-semibold h-full">
          <div className="w-full">
            <h2 className="text-3xl font-semibold text-center my-3">Log In</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="text-white my-2 w-full">
                <label className="text-sm">Email</label>
                <br />
                <input
                  className="border-2 rounded-lg py-3 my-2 px-3 w-full font-semibold"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="text-white my-6">
                <label className="font-semibold text-sm">Password</label>
                <br />
                <input
                  className="border-2 rounded-lg py-3 px-3 my-2 w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Your Password"
                />
              </div>
              <button
                className="py-2 w-full bg-[#05eded] font-semibold text-black rounded-md mb-10"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="w-36 login-img"></div>
      </div>
    </>
  );
};

export default Login;
