import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Image, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import fireDB from "../fireConfig";
import { ListProps, Order, Product } from "../productsData";
import { removeFromCart } from "../Redux/Actions";

export default function ProductList(props: ListProps) {
  const dispatch = useDispatch();
  console.log(props);

  const cartItems: Product[] = props.cartItems;

  console.log(cartItems);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Image</th>
          <th>Item</th>
          <th> Price</th>
          {props.isCart && <th> Action</th>}
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                {" "}
                <Image className="image-cart" src={item.imageURL}></Image>
              </td>
              <td> {item.name}</td>
              <th>{item.price}</th>
              {props.isCart && (
                <th>
                  <AiFillDelete
                    onClick={() => dispatch(removeFromCart(item.id))}
                  />
                </th>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
