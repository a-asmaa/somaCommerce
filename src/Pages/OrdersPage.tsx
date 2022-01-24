import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import Layout from "../Components/Layout";
import fireDB from "../fireConfig";
import { Order } from "../productsData";
import "../stylesheet/cart.css";

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = JSON.parse(localStorage.getItem("soma_user") + "").uid;
  useEffect(() => {
    setIsLoading(true);

    async function getOrders() {
      try {
        const result = await getDocs(collection(fireDB, "orders"));

        let list: any[] = [];
        result.forEach((doc) => {
          list.push({
            ...doc.data(),
          });
        });

        console.log(list);

        setOrders(list);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    getOrders();
  }, []);

  return (
    <Layout isLoading={isLoading} className="order-page">
      {orders
        .filter((order) => order.userId === userId)
        .map((order) => {
          return (
            <Table responsive key={order.id} className="order-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th> Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        {" "}
                        <Image
                          className="image-cart"
                          src={item.imageURL}
                        ></Image>
                      </td>
                      <td> {item.name}</td>
                      <th>{item.price}</th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          );
        })}
    </Layout>
  );
}
