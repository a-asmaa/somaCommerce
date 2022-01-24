import React, { useState } from "react";
import {
  Button,
  FormControl,
  Image,
  Modal,
  Stack,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout";
import { reduxState, User } from "../productsData";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart } from "../Redux/Actions";
import "../stylesheet/cart.css";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: reduxState) => state.cartItem);

  let totalAmount = cartItems.reduce((a, b) => a + b.price, 0);

  const user: User = JSON.parse(localStorage.getItem("soma_user") + "");

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address, setAddress] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOrder = async () => {
    const addressInfo = { name, phone, address, pincode };
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userId: user.uid,
    };

    try {
      setIsLoading(true);
      await addDoc(collection(fireDB, "orders"), orderInfo);
      setIsLoading(false);
      toast.success("Order placed successfully");
      localStorage.removeItem("cartItems");
      handleClose();
      navigate("/orders");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout isLoading={isLoading} className="cart-page">
      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th> Price</th>
            <th> Action</th>
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
                <th>
                  <AiFillDelete
                    onClick={() => dispatch(removeFromCart(item.id))}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Stack direction="vertical" className="cart-end">
        <h3> Total Amount = {totalAmount} EGP </h3>
        <Button onClick={handleShow}> PLACE ORDER </Button>
      </Stack>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add your address </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-form">
            <h3> Register</h3>
            <hr />
            <FormControl
              type="text"
              placeholder="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl
              as="textarea"
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <FormControl
              type="number"
              placeholder="pincode"
              name="pincode"
              onChange={(e) => setPinCode(e.target.value)}
            />
            <FormControl
              type="text"
              placeholder="phone"
              name="phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrder}>
            {" "}
            ORDER{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
