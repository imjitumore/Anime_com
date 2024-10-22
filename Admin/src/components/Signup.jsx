import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
export const Signup = () => {
    const navigate = useNavigate()
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent form reload
    
        try
        {
            const response = await fetch("http://localhost:4000/api/adminSignup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
              })
              if (response.ok) {
                  navigate("/login")
                  alert("Account is created Successfully..!")
                  setEmail("")
                  setPassword("")
                  setConfirmPassword("")
                  setFirstName("")
                  setLastName("")
              } else {
                  alert("Signup failed, please try again.");
              }
        }
        catch(err)
        {
            throw new Error(err,"Error at API");
        }
       
    }
    
  return (
    <>
        <div className='w-1/2  mx-auto'>
            <h1 className='text-white text-3xl my-10 font-semibold text-center'>Create Account</h1>
            <form className='w-full flex flex-col' action="">
                <div className='flex gap-4'>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Fisrt Name:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white " type="text" placeholder='Enter Your Firsr Name' onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Last Name:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold   text-white" type="text" placeholder='Enter Your Last Name' onChange={(e)=>setLastName(e.target.value)} />
                    </div>
                </div>

                <div className='my-4 w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Email:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold   text-white" type="email" placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                
                <div className='flex gap-4'>    
                    <div className=' w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Password:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white" type="password" placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Comfirm Password:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white " type="password" placeholder='Enter Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                </div>

                <div className='w-full'>
                    <button onClick={handleSubmit} className="py-3 px-10  bg-[#f00070] font-semibold text-white  rounded-md w-full my-6 mt-10" type='submit'>Create Account</button>
                </div>
            </form>
        </div>
    </>
  )
}
