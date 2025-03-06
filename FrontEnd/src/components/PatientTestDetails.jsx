import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Table, Form, Modal, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const PatientTestDetails = () => {
  const { patientId } = useParams()
  const [business, setBusiness] = useState(null)
  const [testDetails, setTestDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editTest, setEditTest] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch Business Details
        const businessResponse = await axios.get(
          'http://localhost:3000/api/business/details',
          {
            headers: { Authorization: localStorage.getItem('authToken') },
          }
        )
        setBusiness(businessResponse.data)

        // Fetch Patient Test Details
        const testResponse = await axios.get(
          `http://localhost:3000/api/patient/tests/${patientId}`
        )
        setTestDetails(testResponse.data)
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [patientId])

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = async (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await axios.delete(`http://localhost:3000/api/patient/tests/${testId}`)
        setTestDetails(testDetails.filter((test) => test._id !== testId))
      } catch (error) {
        console.error('Error deleting test:', error)
      }
    }
  }

  const handleEdit = (test) => {
    setEditTest(test)
    setShowModal(true)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/patient/tests/${editTest._id}`,
        editTest
      )
      setTestDetails(
        testDetails.map((test) => (test._id === editTest._id ? editTest : test))
      )
      setShowModal(false)
    } catch (error) {
      console.error('Error updating test:', error)
    }
  }

  const handlePaymentToggle = async (testId, currentStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/patient/tests/${testId}`, {
        payment_status: currentStatus === 'Paid' ? 'Unpaid' : 'Paid',
      })
      setTestDetails(
        testDetails.map((test) =>
          test._id === testId
            ? {
                ...test,
                payment_status: currentStatus === 'Paid' ? 'Unpaid' : 'Paid',
              }
            : test
        )
      )
    } catch (error) {
      console.error('Error updating payment status:', error)
    }
  }

  const filteredTests = testDetails.filter((test) =>
    test.test_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <h2 className="text-center mt-5">Loading Details...</h2>

  return (
    <Container className="mt-4">
      {/* Business Details */}
      {business && (
        <div className="card p-4 shadow mb-4">
          <h2 className="text-center text-primary">{business.brand_name}</h2>
          <hr />
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

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search test..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Patient Test Details Table */}
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Patient Test Details</h3>
        {filteredTests.length > 0 ? (
          <Table bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Result</th>
                <th>Reference Range</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test, index) => (
                <tr key={test._id}>
                  <td>{index + 1}</td>
                  <td>{test.test_name}</td>
                  <td>{test.result}</td>
                  <td>{test.reference_range}</td>
                  <td>{test.doctor_name}</td>
                  <td>{new Date(test.date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant={
                        test.payment_status === 'Paid' ? 'success' : 'warning'
                      }
                      size="sm"
                      onClick={() =>
                        handlePaymentToggle(test._id, test.payment_status)
                      }
                    >
                      {test.payment_status}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleEdit(test)}
                    >
                      ✏ Edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(test._id)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No test records found for this patient.</p>
        )}

        {/* Print Button */}
        <div className="text-center mt-3">
          <Button variant="primary" onClick={handlePrint}>
            🖨 Print
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Test Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                value={editTest?.test_name || ''}
                onChange={(e) =>
                  setEditTest({ ...editTest, test_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Result</Form.Label>
              <Form.Control
                type="text"
                value={editTest?.result || ''}
                onChange={(e) =>
                  setEditTest({ ...editTest, result: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reference Range</Form.Label>
              <Form.Control
                type="text"
                value={editTest?.reference_range || ''}
                onChange={(e) =>
                  setEditTest({ ...editTest, reference_range: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="success" className="mt-3" onClick={handleSaveEdit}>
              💾 Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PatientTestDetails
