import React from 'react';
import {Nav, Navbar, Container, NavDropdown, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/appApi";

function Navigation() {
  //access to state
  const user = useSelector(state => state.user);
  const [logoutUser] = useLogoutUserMutation();



  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    //redirect homepage
    window.location.replace("/");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <LinkContainer to="/">
      <Navbar.Brand><FaComments size={60}/></Navbar.Brand>
      </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {!user && 
          <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        }
          <LinkContainer to="/chat">
          <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
          {user &&
            <NavDropdown title={
              <>
                <img src={user.picture} style={{width: 30, height:30, marginRight:10, objectFit:"cover", borderRadius:"50%"}}/>
                {user.name}
              </>
            } id="basic-nav-dropdown">
              
    
              <NavDropdown.Item>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation