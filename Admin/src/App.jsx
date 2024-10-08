import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
