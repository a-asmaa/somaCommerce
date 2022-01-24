import React from 'react';
import { Button, Col, Form } from "react-bootstrap";


export default function RegisterForm() {



    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement  ),
        formDataObj = Object.fromEntries(formData.entries())
          console.log(formDataObj)

          // register process
    }



  return  <Form onSubmit={handleSubmit}>
                <Col sm={12}>
                    <Form.Control type="email" placeholder="email" name="email" />
                </Col>
                <Col sm={12}>
                    <Form.Control type="password" placeholder="password" name="password" />
                </Col>
                <Col sm={12}>
                    <Form.Control type="password" placeholder="confirm password" name="confirmPassword" />
                </Col>
                <Col >
                    <Button type="submit">Register</Button>
                </Col>
        </Form>
}
