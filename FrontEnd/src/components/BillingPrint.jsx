import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Table, Container } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'

const BillingPrint = () => {
  const [business, setBusiness] = useState(null)
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState([{ name: '', price: 0, quantity: 1 }])
  const componentRef = useRef()

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/business/details',
          {
            headers: { Authorization: localStorage.getItem('authToken') },
          }
        )
        setBusiness(response.data)
      } catch (error) {
        console.error('Error fetching business details:', error)
      }
    }
    fetchBusinessDetails()
  }, [])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { name: '', price: 0, quantity: 1 }])
  }

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <Container className="py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        {/* Business Details */}
        {business && (
          <div className="text-center mb-4">
            <h2 className="text-primary">{business.brand_name}</h2>
            <p>
              <strong>📧 Email:</strong> {business.email}
            </p>
            <p>
              <strong>📞 Phone:</strong> {business.phone_number}
            </p>
            <p>
              <strong>🆔 GST Number:</strong> {business.gst_number}
            </p>
          </div>
        )}

        <h3 className="text-center mb-4">Medical Lab Billing</h3>

        <Form.Group>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Enter Patient Name"
          />
        </Form.Group>

        <Table bordered hover className="mt-4">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Test Name</th>
              <th>Price (₹)</th>
              <th>Qty</th>
              <th>Total (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, 'name', e.target.value)
                    }
                    placeholder="Enter Test Name"
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.price}
                    min="0"
                    onChange={(e) =>
                      handleChange(index, 'price', Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleChange(index, 'quantity', Number(e.target.value))
                    }
                  />
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  {items.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={addItem} className="mb-3">
          Add Test
        </Button>

        <h4 className="text-end">Total: ₹{totalAmount}</h4>

        <Button variant="success" onClick={handlePrint} className="w-100 mt-3">
          Print Bill
        </Button>
      </div>

      {/* Printable Bill */}
      <div className="d-none">
        <div ref={componentRef} className="p-4">
          {/* Business Header */}
          {business && (
            <div className="text-center mb-4">
              <h2 className="text-primary">{business.brand_name}</h2>
              <p>
                <strong>Email:</strong> {business.email}
              </p>
              <p>
                <strong>Phone:</strong> {business.phone_number}
              </p>
              <p>
                <strong>GST Number:</strong> {business.gst_number}
              </p>
            </div>
          )}

          <h3 className="text-center mb-3">Patient Test Bill</h3>
          <p>
            <strong>Patient:</strong> {customer}
          </p>

          <Table bordered>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="text-end">Total: ₹{totalAmount}</h4>
        </div>
      </div>
    </Container>
  )
}

export default BillingPrint
