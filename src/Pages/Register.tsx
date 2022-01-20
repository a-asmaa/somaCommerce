import * as React from "react";
import {  Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../stylesheet/auth.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { options } from "../productsData";


export default function Register() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false) ;


    const signUp = async (email: string, password: string) => {

        setIsLoading(true);
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            setIsLoading(false)
            toast.success("Registration Successful", options )
            navigate('/login')
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.code);
        });

    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement  ),
        formDataObj : any  = Object.fromEntries(formData.entries())
          console.log(formDataObj)
          // register process

         await signUp(formDataObj.email, formDataObj.password)

    }


  return (
    <div className="register">
        {isLoading &&  <Spinner animation="border" role="status" > </Spinner> }
        <div className="register-top"></div>
        <Row >
            <Col md={4}>
            <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_yr6zz3wv.json"
                background="transparent"
                speed="1"
                loop
                autoplay
            ></lottie-player>
            </Col>
            <Col md={4} className="register-form">
                <h3> Register</h3>
                <hr/>
                <Form onSubmit={handleSubmit}>
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
                <hr/>
                <p className="to-hover" onClick={() => navigate('/login')}> Already Registered, Click here to Login </p>
            </Col>
        </Row>
    </div>
  );
}
