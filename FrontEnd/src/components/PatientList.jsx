import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form, Table, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const PatientList = () => {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch patients
  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/patients', {
        headers: { Authorization: localStorage.getItem('authToken') },
      })
      setPatients(response.data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  // Delete patient
  const deletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`http://localhost:3000/api/patients/${id}`)
        fetchPatients()
      } catch (error) {
        console.error('Error deleting patient:', error)
      }
    }
  }

  // Handle edit modal
  const handleEdit = (patient) => {
    setSelectedPatient(patient)
    setShowModal(true)
  }

  // Handle form submission (update patient)
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:3000/api/patients/${selectedPatient._id}`,
        selectedPatient
      )
      fetchPatients()
      setShowModal(false)
    } catch (error) {
      console.error('Error updating patient:', error)
    }
  }

  if (loading) return <h2 className="text-center mt-5">Loading Patients...</h2>

  return (
    <div className="container mt-4">
      <h2 className="text-center">Patient Records</h2>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name, test, or doctor..."
          className="w-50"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <Button variant="success">➕ Add New Patient</Button>
      </div>

      <Table bordered hover responsive className="shadow">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Test</th>
            <th>Result</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients
            .filter((p) =>
              [p.name, p.test_name, p.doctor_name].some((field) =>
                field.toLowerCase().includes(search)
              )
            )
            .map((patient, index) => (
              <tr key={patient._id}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.test_name}</td>
                <td>{patient.result}</td>
                <td>{patient.doctor_name}</td>
                <td>{new Date(patient.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      patient.paid ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {patient.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(patient)}
                  >
                    ✏ Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletePatient(patient._id)}
                  >
                    🗑 Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Edit Patient Modal */}
      {selectedPatient && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPatient.name}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Test Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPatient.test_name}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      test_name: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Result</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPatient.result}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      result: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPatient.doctor_name}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      doctor_name: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedPatient.date}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Paid"
                  checked={selectedPatient.paid}
                  onChange={(e) =>
                    setSelectedPatient({
                      ...selectedPatient,
                      paid: e.target.checked,
                    })
                  }
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}

export default PatientList
