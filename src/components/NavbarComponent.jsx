import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <Navbar expand='lg' className='color-active'>
            <Container>
                <Navbar.Brand href='' className='fs-3 fw-bold'>
                    Pokemon App.
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto text-center'>
                        <div className='nav-link'>
                            <NavLink to='' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')} end>
                                Pokemon List
                            </NavLink>
                        </div>
                        <div className='nav-link'>
                            <NavLink to='mypokemon' className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')} end>
                                My Pokemon
                            </NavLink>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
