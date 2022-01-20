import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Layout from '../Components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import fireDB from '../fireConfig';
import { Product } from '../productsData';
import ProductCard from '../Components/Card';
import Filter from '../Components/Filter';

export default function HomePage() {

    const [products, setProducts] = useState<Product[]>([]) ;
    const [categories, setCategories] = useState<string[]>([]) ;
    const [isLoading, setIsLoading] = useState(true) ;


    const changeProducts = (products : Product[]) =>{
        setProducts(products)
    }

    const getProducts = async ()=>{

        try {
            const productArray : any[] = [];            

            const productList = await getDocs(collection(fireDB, "products"));

            productList.forEach((doc) => {
                productArray.push({
                   id: doc.id,
                    ...doc.data()
                })
            });

            const categoryArray : string[] =  [...new Set(productArray.map(item => item.category))];
            
            setProducts(productArray)
            setCategories(categoryArray)
        
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
      }


   /* const addData = async ()=>{
        try {
             await addDoc(collection(fireDB, "users"), {
                name: "ahmed",
                age: "28",
            });

        } catch (error) {
            console.log(error);
        }
      }

      const addProduct = ()=>{
          fireProducts.map( async (product) => {
            try {
                await addDoc(collection(fireDB, "products"), product);
   
           } catch (error) {
               console.log(error);
           }
          }
          )
      }
*/
      useEffect(()=> {

        getProducts();


      }, [])
     
    return (
        <Layout isLoading={isLoading}>
           {/** <Button onClick={addData}>Add</Button>
            <Button onClick={getData}>Get</Button>
            <Button onClick={addProduct}>addProducts</Button> */} 

            <Filter categories={categories} changeProducts={changeProducts} />
            <Row>
                {products.map(product => {
                    return <Col key={product.id} className='col-md-4'>
                        <ProductCard  product={product} />
                    </Col>
                })}
            </Row>
        </Layout>
    )
}
