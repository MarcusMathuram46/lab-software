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
              <Nav.Link href="/home" style={{ color: 'white' }}>
                Home
              </Nav.Link>
              <Nav.Link href="/billing" style={{ color: 'white' }}>
                Billing
              </Nav.Link>
              <Nav.Link href="/services" style={{ color: 'white' }}>
                Services
              </Nav.Link>
              <Nav.Link href="/test" style={{ color: 'white' }}>
                Test
              </Nav.Link>
              <Nav.Link href="/test-details" style={{ color: 'white' }}>
                Patient
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar