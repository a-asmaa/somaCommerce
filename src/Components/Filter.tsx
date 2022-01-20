import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import fireDB from '../fireConfig';
import { Category } from '../productsData';

interface filterProps{
    categories : string[],
    changeProducts : any
}

export default function Filter(props : filterProps) {


    const {categories, changeProducts} = props;

    const getCategories = () => {

    }

    const search = (txt: string) => {
        console.log(txt);
        
    }

    const searchByCategory = async (category: string) => {
        console.log(category);
        let q ;
        if(category === "all")  q = collection(fireDB, "products")
        else  q = query(collection(fireDB, "products"), where("category", "==", category));

        const products = await getDocs(q);
        let productArray: any[] = []
        
        products.forEach((p) => {
          productArray.push({
            id: p.id,
            ...p.data()
         })
        });
        
        changeProducts(productArray)
    }


    useEffect(()=>{
        getCategories();

    }, [])

    
    return (
        <Row xs={2} md={4} lg={6}>
           <Col> <Form.Control type="text" placeholder="search items" onChange={e => search(e.target.value)} /> </Col>

           <Col>
            <Form.Select aria-label="Default select example" onChange={e=> searchByCategory(e.target.value)}>
                <option key="-1" value="all">All</option>
                { categories.map((val, index) => {
                    return  <option key={index} value={val}>{val}</option>
                })
                }
            </Form.Select>
            </Col>
        </Row>
    )
}
