import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { authContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../App.css"
const NavBar = () => {
  const { isLoggedIn, rule, handleLogout,currentUser} = useContext(authContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <Navbar className='navbar' variant="dark">
      <Container>
        <Navbar.Brand 
          onClick={() => navigate(isLoggedIn ? (rule === "admin" ? "/admin" : "/user") : "/")}
          className='text-light'
          style={{ cursor: 'pointer' }}
        >
          Restaurant
        </Navbar.Brand>
        <Nav className="me-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link onClick={() => navigate(rule === "admin" ? "/admin" : "/user")} className='text-white'>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate(rule === "admin" ? "" : "/user/items")} className={rule === "admin" ? "d-none" : "text-white"}>
                Items
              </Nav.Link>
              <Nav.Link onClick={() => navigate(rule === "admin" ? "" : "/user/cart")} className={rule === "admin" ? "d-none" : "text-white"}>
             Cart
              </Nav.Link>
              <Nav.Link disabled  className='text-white'>
                Welcome {rule === "admin" ? "Admin" : "User"} {currentUser.name}
              </Nav.Link>
              <button className="btn btn-danger btn-md ms-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Nav.Link onClick={() => navigate("/login")} className='text-white'>Login</Nav.Link>
              <Nav.Link onClick={() => navigate("/register")} className='text-white'>Register</Nav.Link>
              <Nav.Link disabled>Welcome Guest</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
