import React, { Component } from 'react';
import logo from '../images/themoviedb_logo.svg';
import Search from './Search'
import {
  Container, Row, Col, Navbar, Nav,
  NavbarBrand, NavLink, NavItem
} from 'reactstrap';

class Header extends Component{
  render(){
    return(
      <header>
        <Navbar fixed="top" color="dark" light expand="xs" style={{ height: 90 }}>
        
          <Container>
            <Row noGutters className="position-relative w-100 align-items-center">
                          
              <div className="d-flex justify-content-xs-start justify-content-lg-center">
                <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                  <img src={logo} alt="logo" className="position-relative img-fluid" />
                </NavbarBrand>
              </div>
              <Col className="d-none d-lg-flex justify-content-start">
                <Nav className="mrx-auto" navbar>
                  
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/discover" style={{color: "white"}}>DISCOVER</NavLink>
                  </NavItem>
                  
                  {/* <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/" style={{color: "white"}}>MOVIES</NavLink>
                  </NavItem> */}
                  
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/" style={{color: "white"}}>PEOPLE</NavLink>
                  </NavItem>
                  {/* <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                    <DropdownToggle className="font-weight-bold" nav caret>Learn</DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Learn React</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Documentation</DropdownItem>
                      <DropdownItem>Tutorials</DropdownItem>
                      <DropdownItem>Courses</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown> */}
                  
                </Nav>
              </Col>
              
              <Search/>
              
            </Row>
          </Container>
          
        </Navbar>
      </header>
    )
  }
}

export default Header;