import React, { useState } from 'react'
import { Table, Form, Container } from 'react-bootstrap'

const labTests = [
  { name: 'Complete Blood Count (CBC)', price: 300, category: 'Blood Test' },
  { name: 'Liver Function Test (LFT)', price: 700, category: 'Blood Test' },
  { name: 'Kidney Function Test (KFT)', price: 800, category: 'Blood Test' },
  { name: 'Thyroid Profile', price: 600, category: 'Hormone Test' },
  { name: 'Fasting Blood Sugar', price: 200, category: 'Diabetes Test' },
  { name: 'HbA1c (Diabetes)', price: 500, category: 'Diabetes Test' },
  { name: 'Chest X-Ray', price: 1000, category: 'Imaging Test' },
  { name: 'Ultrasound Abdomen', price: 1500, category: 'Imaging Test' },
  { name: 'ECG (Electrocardiogram)', price: 400, category: 'Cardiology Test' },
  { name: '2D Echo', price: 2000, category: 'Cardiology Test' },
]

const categories = ['All', ...new Set(labTests.map((test) => test.category))]

const MedicalLabServices = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTests = labTests.filter(
    (test) =>
      (selectedCategory === 'All' || test.category === selectedCategory) &&
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Container className="py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Our Medical Lab Services</h2>

        {/* Search & Filter Options */}
        <Form className="d-flex gap-3 mb-3">
          <Form.Control
            type="text"
            placeholder="Search test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form>

        {/* Service List Table */}
        <Table bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.length > 0 ? (
              filteredTests.map((test, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{test.name}</td>
                  <td>{test.category}</td>
                  <td>₹{test.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-danger">
                  No tests found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default MedicalLabServices
