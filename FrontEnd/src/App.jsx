import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'
import NavBar from "./components/NavBar"
import Home from './components/Home'
import BusinessRegister from './components/BusinessRegistration'

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken') // Use the correct key
  // Check if user is logged in

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<BusinessRegister />} />
        {/* Protect the home route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
