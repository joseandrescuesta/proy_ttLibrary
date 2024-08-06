import React from 'react'
import logo from '../img/Open_book.png'

import estilos from '../css/estilos.module.css'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {


    return (
        <div className={estilos.encabezado}>
            <Navbar data-bs-theme="dark">
                <Container>

                    <Navbar.Brand href="#home">
                        <Nav.Link as={NavLink} to="/main">
                            <img src={logo} alt="logo" height="30px" />{' '}<span style={{ fontSize: "30px" }}>Biblioteca</span>
                        </Nav.Link>
                    </Navbar.Brand>


                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} className={estilos.menuencabezado} to="/main">Libros</Nav.Link>
                        <Nav.Link as={NavLink} className={estilos.menuencabezado}>Usuarios</Nav.Link>

                    </Nav>




                </Container>
            </Navbar>

        </div>

    )
}

export default Header