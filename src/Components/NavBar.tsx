import * as React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { BsCart } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxState, User } from '../productsData';
import '../stylesheet/Layout.css'

export default function NavBar() {

    const selector = useSelector((state: reduxState)=> state.cartItem )
    
    const user : User =  JSON.parse(localStorage.getItem('soma_user') || '{}')

    return (
        <Navbar className='navbar-101' collapseOnSelect expand="lg" variant="dark" fixed="top">
            <Container>
                <Link className='navbar-brand' to="/">SomaCommerce</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Navbar.Text >{user.email.split('@')[0]} </Navbar.Text>
                        <Link className='nav-link' to="/cart">Orders</Link>
                        <Link className='nav-link' to="/login" onClick={()=> {localStorage.removeItem('soma_user')}}>Logout</Link>
                        <Link className='nav-link' to="/cart"><BsCart /> {selector.length}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    )
}

