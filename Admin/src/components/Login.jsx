import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import user from "/programmer.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent form reload

    try {
      const response = await fetch("http://localhost:4000/api/adminLogin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to login");
      } else {
        localStorage.setItem("admin", JSON.stringify(data)); // Store user info/token
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Failed: ", error);
      alert("Login failed...");
    }
  }

  return (
    <>
      <div className="w-1/4 mx-auto">
        <h1 className="text-white text-3xl my-10 font-semibold text-center">
          ADMIN LOGIN
        </h1>

        <form className="w-full" action="">
          <div className="w-full">
            <img className="h-28 mx-auto" src={user} alt="" />
          </div>
          <div>
            <label className="text-sm font-semibold my-2 text-white" htmlFor="">
              Email:
            </label>
            <br />
            <input
              className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white"
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold my-2 text-white" htmlFor="">
              Password:
            </label>
            <br />
            <input
              className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold   text-white"
              type="passwrod"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="py-2  bg-[#f00070] font-semibold text-white  rounded-md w-full my-3 "
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
