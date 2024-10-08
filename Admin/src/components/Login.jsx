import React from 'react'
import user from '/programmer.png'
export const Login = () => {
  return (
    <>
        <div className='w-1/4 mx-auto'>
            <h1 className='text-white text-3xl my-10 font-semibold text-center'>ADMIN LOGIN</h1>

            <form className='w-full' action="">
                <div className='w-full'><img className='h-28 mx-auto' src={user} alt="" /></div>
                <div>
                <label className='text-sm font-semibold my-2 text-white' htmlFor="">Email:</label><br />
                <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  " type="email" placeholder='Enter Your Email' />
                </div>
                <div>
                <label className='text-sm font-semibold my-2 text-white' htmlFor="">Password:</label><br />
                <input className="border-2 rounded-lg py-3 my-2 px-3 w-full  font-semibold  " type="passwrod" placeholder='Enter Your Email' />
                </div>
                <div>
                    <button className="py-2  bg-[#f00070] font-semibold text-white  rounded-md w-full my-3 " type='submit'>Login</button>
                </div>
            </form>
        </div>
    </>
  )
}
