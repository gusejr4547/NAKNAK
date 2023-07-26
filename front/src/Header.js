import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
// import { Container, Row, Col } from 'react-bootstrap';

function Header(props) {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/fishing">Fishing</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    // return (
    //     <div style={{
    //         display: 'flex',         // 수직 정렬을 위해 flex 사용
    //         alignItems: 'center',    // 세로 중앙 정렬
    //         justifyContent: 'center' // 가로 중앙 정렬
    //     }}>
    //         <Link to="/">
    //             <button>main</button>
    //         </Link>
    //         <Link to="/fishing">
    //             <button>fishing</button>
    //         </Link>
    //         <Link to="/login">
    //             <button>Login</button>
    //         </Link>
    //     </div>
    // );
}

export default Header;