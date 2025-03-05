import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
function NavBar() {
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ background: 'linear-gradient(to right, #003366, #00509e)' }}
      >
        <Container>
          <Navbar.Brand href="/" style={{ color: 'white', fontWeight: 'bold' }}>
            MyBrand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" style={{ color: 'white' }}>
                Home
              </Nav.Link>
              <Nav.Link href="/about" style={{ color: 'white' }}>
                About
              </Nav.Link>
              <Nav.Link href="/services" style={{ color: 'white' }}>
                Services
              </Nav.Link>
              <Nav.Link href="/contact" style={{ color: 'white' }}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar