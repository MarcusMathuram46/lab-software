import axios from 'axios'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import '../style/Register.css'

function Register() {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  // Handle input changes
  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/register',
        registerData
      )
      const info = response.data
      setMsg(info.message)
      setError('')
      setRegisterData({ name: '', email: '', password: '' })
    } catch (error) {
      setMsg('')
      setError(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      )
      console.error(error)
    }
  }

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="register-box"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-center mb-4 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Register
        </motion.h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text-black">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-black">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              autoComplete="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-black">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button className="btn-animated" variant="primary" type="submit">
              Register
            </Button>
          </motion.div>
          <p className="mt-3">
            Already have an account?{' '}
            <Link className="link-login" to="/">
              Login here
            </Link>
          </p>
          {msg && (
            <motion.p
              className="text-success mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {msg}
            </motion.p>
          )}
          {error && (
            <motion.p
              className="text-danger mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
        </Form>
      </motion.div>
    </motion.div>
  )
}

export default Register
