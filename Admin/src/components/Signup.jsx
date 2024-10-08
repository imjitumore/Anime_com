import React from 'react'

export const Signup = () => {
  return (
    <>
        <div className='w-1/2  mx-auto'>
            <h1 className='text-white text-3xl my-10 font-semibold text-center'>Create Account</h1>
            <form className='w-full flex flex-col' action="">
                <div className='flex gap-4'>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Fisrt Name:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white" type="email" placeholder='Enter Your Firsr Name' />
                    </div>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Last Name:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold   text-white" type="passwrod" placeholder='Enter Your Last Name' />
                    </div>
                </div>
                
                <div className='my-4 w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Email:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold   text-white" type="email" placeholder='Enter Your Email' />
                </div>
                
                <div className='flex gap-4'>    
                    <div className=' w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Password:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white" type="passwrod" placeholder='Enter Your Password' />
                    </div>
                    <div className='w-full'>
                    <label className='text-sm font-semibold my-2 text-white' htmlFor="">Comfirm Password:</label><br />
                    <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  text-white " type="passwrod" placeholder='Enter Confirm password' />
                    </div>
                </div>

                <div className='w-full'>
                    <button className="py-3 px-10  bg-[#f00070] font-semibold text-white  rounded-md w-full my-6 mt-10" type='submit'>Create Account</button>
                </div>
            </form>
        </div>
    </>
  )
}
