import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const [business, setBusiness] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await axios.get(
          'http://localhost:5000/api/business/details',
          {
            headers: { Authorization: token },
          }
        )
        setBusiness(response.data)
      } catch (error) {
        console.error(error)
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    fetchBusinessDetails()
  }, [navigate])

  if (!business) {
    return <h2 className="text-center mt-5">Loading Business Details...</h2>
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center text-primary">
          Welcome, {business.brand_name}!
        </h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h5>📞 Phone Number:</h5>
            <p>{business.phone_number}</p>

            <h5>📍 Address:</h5>
            <p>{business.address}</p>
          </div>
          <div className="col-md-6">
            <h5>📧 Email:</h5>
            <p>{business.email}</p>

            <h5>🆔 GST Number:</h5>
            <p>{business.gst_number}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
