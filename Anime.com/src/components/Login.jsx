import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import signup from "/signup.png"
import login from "/login.webp"
import { Navbar2 } from "./Navbar2";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // To redirect the user after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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
        setSuccess('Login successful!');
        // Redirect to Home
        navigate('/home');
      }
    } catch (err) {
      setError('Failed to login');
    }
  };
 // localStorage.removeItem('user'); // Remove user data from localStorage

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center">
        <div className="">
            <img className="h-[400px]" src={login} alt="" />
        </div>
        <div className="text-white border-2 py-4 px-8 my-4 font-semibold">
          <div className="">
            <h2 className="text-3xl font-semibold text-center my-6">Log In</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="text-white my-2">
                <label className="text-sm ">Email </label><br />
                <input
                  className="border-2 rounded-lg py-2 px-2 w-full  font-light"
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
                  className="border-2 rounded-lg py-2 px-2"
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
        <div className="w-36">
        </div>
      </div></>

  );
};


export default Login;
