import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Image,
  Modal,
  Stack,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Layout from "../Components/Layout";
import fireDB from "../fireConfig";
import { initialProduct, Product } from "../productsData";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState<Product>(initialProduct);

  const editHandler = (item: Product) => {
    setProduct(item);
    setShow(true);
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);

      let result = await getDocs(collection(fireDB, "products"));
      let productArray: any[] = [];

      result.forEach((doc) => {
        productArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(productArray);
      setProducts(productArray);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const updateProduct = async () => {
    try {
      setIsLoading(true);
      await setDoc(doc(fireDB, "products", product?.id), product);
      toast.success("product updated successfully");

      setShow(false);
      getProducts();
    } catch (error) {
      setIsLoading(true);
      toast.error("product update failed");
    }
  };

  const addProduct = async () => {
    try {
      setIsLoading(true);
      let x: any = product;
      delete x.id;
      await addDoc(collection(fireDB, "products"), x);
      toast.success("product added successfully");

      setShow(false);
      getProducts();
    } catch (error) {
      setIsLoading(true);
      toast.error("product add failed");
    }
    setAdd(false);
  };

  const deleteProduct = async (item: Product) => {
    try {
      setIsLoading(true);
      await deleteDoc(doc(fireDB, "products", item?.id));
      getProducts();

      toast.success("product removed successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("product remove failed");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout isLoading={isLoading} className="admin-page">
      <Stack direction="horizontal" style={{ justifyContent: "space-between" }}>
        <h1>Product List</h1>
        <Button
          onClick={() => {
            setAdd(true);
            setProduct(initialProduct);
            setShow(true);
          }}
        >
          {" "}
          Add Product
        </Button>
      </Stack>

      <Table responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item</th>
            <th> Category</th>
            <th> Price</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {" "}
                  <Image className="image-cart" src={item.imageURL}></Image>
                </td>
                <td> {item.name}</td>
                <th>{item.category}</th>
                <th>{item.price}</th>
                <th>
                  <AiFillDelete
                    color="red"
                    onClick={() => deleteProduct(item)}
                  />
                  <AiFillEdit onClick={() => editHandler(item)} />
                </th>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> {add ? "Add " : "Edit "}Product </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-form">
            <FormControl
              type="text"
              placeholder="name"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <FormControl
              type="text"
              placeholder="Image url"
              value={product.imageURL}
              onChange={(e) =>
                setProduct({ ...product, imageURL: e.target.value })
              }
            />

            <FormControl
              type="number"
              placeholder="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
            />
            <FormControl
              type="text"
              placeholder="category"
              name="category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              setAdd(false);
            }}
          >
            Close
          </Button>
          {add ? (
            <Button variant="primary" onClick={addProduct}>
              {" "}
              SAVE{" "}
            </Button>
          ) : (
            <Button variant="primary" onClick={updateProduct}>
              {" "}
              SAVE{" "}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
