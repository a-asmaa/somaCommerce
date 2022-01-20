import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Footer from './Footer'
import NavBar from './NavBar'
import "../stylesheet/Layout.css"
import { LayoutProps } from '../productsData'


export default function Layout(props : LayoutProps) {
    return (
        <div>
            <NavBar/>
             <Container className='content'>

                {
                    props.isLoading ? <Spinner animation="border" role="status" > </Spinner> :  props.children
                }

             </Container> 
          {/*  <Footer/> */}
        </div>
    )
}
