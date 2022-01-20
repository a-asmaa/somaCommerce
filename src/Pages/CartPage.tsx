import React from 'react'
import { Badge, Button, Image, Stack, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../Components/Layout'
import { reduxState } from '../productsData'
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart } from '../Redux/Actions'
import '../stylesheet/cart.css'


export default function CartPage() {

    const dispatch = useDispatch()
    const cartItems =  useSelector((state: reduxState)=> state.cartItem )

    let totalAmount = cartItems.reduce((a,b) => a + b.price, 0);
    console.log(cartItems);
    

    return (
        <Layout isLoading={false}>
            <Table responsive>
                <thead>
                    <tr>
                        <th >Image</th>
                        <th >Item</th>
                        <th > Price</th>
                        <th > Action</th>                  
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        return <tr key={item.id}>
                            <td > <Image className='image-cart' src={item.imageURL}></Image></td>
                            <td > {item.name}</td>
                            <th >{item.price}</th>
                            <th ><AiFillDelete onClick={()=> dispatch(removeFromCart(item.id))}/></th>
                        </tr>
                    })
                    }
                </tbody>
            </Table>
            <Stack direction='vertical' className='cart-end'>
                <h3 > Total Amount = {totalAmount} EGP </h3>
                <Button> PLACE ORDER </Button>
            </Stack>
                    

        </Layout>
    )
}
