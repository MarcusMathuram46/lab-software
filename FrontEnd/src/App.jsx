import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'

import Home from './components/Home'
import BusinessRegister from './components/BusinessRegistration'

function App() {
  const isAuthenticated = !!localStorage.getItem('token') // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusinessRegister />} />
        <Route path="/login" element={<Login />} />
        {/* Protect the home route */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
