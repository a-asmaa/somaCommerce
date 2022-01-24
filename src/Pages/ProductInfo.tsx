import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Image, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../Components/Layout";
import fireDB from "../fireConfig";
import { Product } from "../productsData";
import { addToCart } from "../Redux/Actions";
import "../stylesheet/products.css";
export default function ProductInfo() {
  const param = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  const getProductById = async (id: string) => {
    try {
      const productObject = await getDoc(doc(fireDB, "products", id));
      setProduct({ id: id, ...(productObject.data() as any) });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const Id = param.id;
    getProductById(Id + "");
  }, []);

  return (
    <Layout isLoading={isLoading} className="productInfo-page">
      <Row className="product-info">
        <Col className="col-md-10">
          {product && (
            <>
              <h3>{product.name}</h3>
              <Image src={product.imageURL} className="product-img" />
              <hr />
              <p>{product.description}</p>

              <Stack direction="horizontal" className="cart-btn">
                <h4>
                  {" "}
                  <b>Price: {product.price} EGP </b>
                </h4>
                <Button onClick={() => dispatch(addToCart(product))}>
                  {" "}
                  ADD TO CART
                </Button>
              </Stack>
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
}
