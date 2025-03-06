import React, { useState, useRef } from 'react'
import { Form, Button, Table, Container } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print'

const MedicalLabTest = () => {
  const [patientName, setPatientName] = useState('')
  const [age, setAge] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]) // Default: Today’s Date
  const [tests, setTests] = useState([{ testName: '', price: 0 }])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleChange = (index, field, value) => {
    const newTests = [...tests]
    newTests[index][field] = value
    setTests(newTests)
  }

  const addTest = () => {
    setTests([...tests, { testName: '', price: 0 }])
  }

  const removeTest = (index) => {
    const newTests = tests.filter((_, i) => i !== index)
    setTests(newTests)
  }

  const totalAmount = tests.reduce((acc, test) => acc + Number(test.price), 0)

  return (
    <Container className="py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Medical Lab Test Billing</h2>

        <Form.Group>
          <Form.Label>Patient Name</Form.Label>
          <Form.Control
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter Patient Name"
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
            min="0"
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Doctor's Name (Optional)</Form.Label>
          <Form.Control
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter Doctor’s Name"
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Table bordered hover className="mt-4">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Test Name</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    type="text"
                    value={test.testName}
                    onChange={(e) =>
                      handleChange(index, 'testName', e.target.value)
                    }
                    placeholder="Enter Test Name"
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={test.price}
                    min="0"
                    onChange={(e) =>
                      handleChange(index, 'price', Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  {tests.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeTest(index)}
                    >
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={addTest} className="mb-3">
          Add Test
        </Button>

        <h4 className="text-end">Total: ₹{totalAmount}</h4>

        <Button variant="success" onClick={handlePrint} className="w-100 mt-3">
          Print Report
        </Button>
      </div>

      {/* Printable Report */}
      <div className="d-none">
        <div ref={componentRef} className="p-4">
          <h2 className="text-center mb-3">Medical Test Report</h2>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Patient Name:</strong> {patientName}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          {doctorName && (
            <p>
              <strong>Doctor:</strong> {doctorName}
            </p>
          )}

          <Table bordered>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index}>
                  <td>{test.testName}</td>
                  <td>₹{test.price}</td>
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

export default MedicalLabTest
