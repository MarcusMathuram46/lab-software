import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../style/businessRegistration.css' // Import your CSS file

const BusinessRegister = () => {
  const [formData, setFormData] = useState({
    brand_name: '',
    phone_number: '',
    address: '',
    email: '',
    gst_number: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await axios.post(
        'http://localhost:3000/api/business/register',
        formData
      )
      setMessage({ type: 'success', text: 'Registration successful!' })

      setTimeout(() => {
        navigate('/home') // Redirect to home after registration
      }, 1500)

      setFormData({
        brand_name: '',
        phone_number: '',
        address: '',
        email: '',
        gst_number: '',
        password: '',
      })
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Registration failed',
      })
    } finally {
      setLoading(false)
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
          Business Registration
        </motion.h2>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Alert variant={message.type}>{message.text}</Alert>
          </motion.div>
        )}

        <Form onSubmit={handleSubmit}>
          {[
            { label: 'Brand Name', name: 'brand_name', type: 'text' },
            { label: 'Phone Number', name: 'phone_number', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'GST Number', name: 'gst_number', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
          ].map((field, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label className="form-label">{field.label}</Form.Label>
              <motion.div
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete={field.name}
                  required
                />
              </motion.div>
            </Form.Group>
          ))}

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="submit"
              disabled={loading}
              className="btn-animated mt-3"
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </motion.div>
  )
}

export default BusinessRegister
