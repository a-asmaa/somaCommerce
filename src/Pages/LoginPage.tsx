import * as React from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../stylesheet/auth.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { options } from "../productsData";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);

        localStorage.setItem("soma_user", JSON.stringify(userCredential.user));
        setIsLoading(false);
        toast.success(" Login Successful", options);
        window.location.href = "/";
      })
      .catch((error) => {
        toast.error("Login Failed");
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement),
      formDataObj: any = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    // login process
    await login(formDataObj.email, formDataObj.password);
  };

  return (
    <div className="login">
      {isLoading && (
        <Spinner animation="border" role="status">
          {" "}
        </Spinner>
      )}

      <div className="login-bottom"></div>
      <Row>
        <Col md={4} className="login-form">
          <h3> Login</h3>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Control type="email" placeholder="email" name="email" />
            <Col sm={12}>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
              />
            </Col>
            <Col>
              <Button type="submit">Login</Button>
            </Col>
          </Form>
          <hr />
          <p className="to-hover" onClick={() => navigate("/register")}>
            {" "}
            Click Here To Register{" "}
          </p>
        </Col>
        <Col md={4}>
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_hu9cd9.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </Col>
      </Row>
    </div>
  );
}
