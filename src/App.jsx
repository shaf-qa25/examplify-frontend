import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Pages from './components/Pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
  <Route path="/" element={<Home/> } />
  <Route path="/login" element={<Login/> } />
  <Route path="/signup" element={<Signup/> } />
  <Route path="/dashboard" element={<Dashboard/> } />
  <Route path="/pages" element={<Pages/> } />
</Routes>
    </>
  )
}

export default App
