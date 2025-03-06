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
import BillingPrint from './components/BillingPrint'
import MedicalLabTest from './components/MedicalLabTest'
import PatientTestDetails from './components/PatientTestDetails'
import MedicalLabServices from './components/MedicalLabServices'
import PatientList from './components/PatientList'

function App() {
  // const isAuthenticated = !!localStorage.getItem('authToken') // Use the correct key
  // Check if user is logged in

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<BusinessRegister />} />
        {/* Protect the home route */}
        <Route path="/home" element={<Home />} />
        <Route path="/billing" element={<BillingPrint />} />
        <Route path="/test" element={<MedicalLabTest/>} />
        <Route path="/test-details" element={<PatientTestDetails />} />
        <Route path="/services" element={<MedicalLabServices />} />
      </Routes>
    </Router>
  )
}

export default App
