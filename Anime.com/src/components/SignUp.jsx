import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "/signup.png"
import login from "/login.webp"
import { Navbar2 } from "./Navbar2";


const SignUp = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://anime-com-backend.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate("login")
        setError("Account is created..!")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } else {
        setError("Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Something went wrong, please try again later.");
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="flex  justify-center">
        <div className="w-80">

        </div>
        <div className="text-white border-2 py-6 px-8 my-4 font-semibold">
          <div className="">
            <h2 className="text-3xl font-semibold text-center my-4">Create Account</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label className="text-sm font-semibold">Email:</label><br />
                <input
                  className="border-2 rounded-lg py-2 px-2 font-light w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="my-3">
                <label className="text-sm font-semibold">Password:</label><br />
                <input
                  className="border-2 rounded-lg py-2 px-2 font-light w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create Your Password"
                />
              </div>
              <div className="my-2 ">
                <label className="text-sm font-semibold">Confirm Password:</label><br />
                <input
                  className="border-2 rounded-lg py-2 px-2 font-light w-full"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Your Password"
                />
              </div>
              <div className="">
                <button className="border-2 py-2 px-12 rounded-md bg-[#fc5d00] my-4 border-none text-center w-full" type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
        <div className="">
            <img className="h-[400px] mt-4" src={signup} alt="" />
          </div>
      </div>
    </>
  );
};



// function LoginPage() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   // const navigate = useNavigate(); // To redirect the user after successful login

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     try {
//       const response = await fetch('https://localhost:4000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log(data)
//       if (!response.ok) {
//         setError(data.message || 'Failed to login');
//       } else {
//         // Store user data or token in localStorage
//         localStorage.setItem('user', JSON.stringify(data)); // Store the entire user object or token
//         setSuccess('Login successful!');

//         // Redirect to dashboard
//         navigate('/home');
//       }
//     } catch (err) {
//       setError('Failed to login');
//     }
//   };


//   return (
//     <>
//         <div className="">
//         <h2 className="text-3xl font-semibold text-center my-4">Log In</h2>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="text-white my-2">
//               <label className="font-semibold text-xl">Email </label><br />
//               <input
//                 className="border-2 rounded-lg py-2 px-2 w-full  font-light"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Enter Your Email"
//               />
//             </div>
//             <div className="text-white my-4">
//               <label className="font-semibold text-xl">Password </label><br />
//               <input
//                 className="border-2 rounded-lg py-2 px-2"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="Enter Your Password"
//               />
//             </div>
//             <button className="py-2 w-full bg-[#05eded] font-semibold text-black rounded-md mb-10" type="submit">Login</button>
//           </form>
//         </div>
//         <div className="absolute top-28 left-[27%] ">
//           <img className="h-[400px]" src={login} alt="" />
//         </div>

//     </>
//   )
// }





function SignPage() {


  return (
    <>

    </>
  )
}

export default SignUp;
