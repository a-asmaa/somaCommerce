import * as React from 'react'
import {  Button, Card, Stack } from 'react-bootstrap'
import { Product } from '../productsData'
import "../stylesheet/products.css"
import "../stylesheet/Layout.css"
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux'
import { ADD, addToCart } from '../Redux/Actions'


interface productProps {
    product: Product
}

function ProductCard(props: productProps) {

    const product: Product = props.product ;
    const dispatch = useDispatch()

    return (
        <Card className='product-card' >
            <Card.Body>
                <Card.Title> {product.name} </Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
                <Card.Img variant="top" src={product.imageURL} />
            </Card.Body>
            <div className='product-hover'>
                <h2> {product.price} EGP/-</h2>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary"  onClick={()=> dispatch(addToCart(product))} >ADD TO CART</Button>

                    <Link to={{pathname:`/productInfo/${product.id}` }}>
                        <Button variant="primary"> VIEW </Button>
                    </Link>
                </Stack>
            </div>
        </Card>
    )
}

export default connect()(ProductCard)