import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Layout from "../Components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { Product } from "../productsData";
import ProductCard from "../Components/Card";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getProducts = async () => {
    try {
      const productArray: any[] = [];

      const productList = await getDocs(collection(fireDB, "products"));

      productList.forEach((doc) => {
        productArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const categoryArray: string[] = [
        ...new Set(productArray.map((item) => item.category)),
      ];

      setProducts(productArray);
      setCategories(categoryArray);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout isLoading={isLoading} className="home-page">
      <Row xs={2} md={4} lg={4} className="filter">
        <Col>
          {" "}
          <Form.Control
            type="text"
            placeholder="search items"
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
        </Col>

        <Col>
          <Form.Select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option key="-1" value="">
              All
            </option>
            {categories.map((val, index) => {
              return (
                <option key={index} value={val}>
                  {val}
                </option>
              );
            })}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {products
          .filter((x) => x.name.toLowerCase().includes(search))
          .filter((x) =>
            x.category.toLowerCase().includes(selectedCategory.toLowerCase())
          )
          .map((product) => {
            return (
              <Col key={product.id} className="col-md-4">
                <ProductCard product={product} />
              </Col>
            );
          })}
      </Row>
    </Layout>
  );
}
