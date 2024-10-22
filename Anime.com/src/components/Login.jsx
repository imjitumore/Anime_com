import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import signup from "/signup.png"
import login from "/login.webp"
import { Navbar2 } from "./Navbar2";


const Login = ({setUserr}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To redirect the user after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://anime-com-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        setError(data.message || 'Failed to login');
      } else {
        // Store user data or token in localStorage
        localStorage.setItem('user', JSON.stringify(data)); // Store the entire user object or token
        setUserr(JSON.stringify(data))
        // Redirect to Home
        navigate('/home');
      }
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="login-main w-full flex justify-center h-full ">
        <div className="">
            <img className="login-img h-[400px]" src={login} alt="" />
        </div>
        <div className="login-container text-white px-8  font-semibold h-full">
          <div className="w-full">
            <h2 className="text-3xl font-semibold text-center my-3">Log In</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="text-white my-2 w-full">
                <label className="text-sm ">Email </label><br />
                <input
                  className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="text-white my-6">
                <label className="font-semibold text-sm">Password </label><br />
                <input
                  className="border-2 rounded-lg py-3 px-3 my-2 w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Your Password"
                />
              </div>
              <button className="py-2 w-full bg-[#05eded] font-semibold text-black rounded-md mb-10" type="submit">Login</button>
            </form>
          </div>
        </div>
        <div className="w-36 login-img">
        </div>
      </div></>

  );
};


export default Login;
