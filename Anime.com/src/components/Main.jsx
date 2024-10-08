import React from 'react'
import { Navbar2 } from './Navbar2'
import main from "/main.webp"

export const Main = () => {
  return (
    <>
        <Navbar2/>
        <div className='w-full flex justify-center my-2'>
        <img className='h-96' src={main} alt="" />
        </div>
    </>
  )
}
