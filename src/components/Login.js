import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sign_img from "./Sign_img";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

const Login = () => {
  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/db.json");
      const jsonData = await response.json();
      setData(jsonData.tasks); // Set the tasks array from jsonData
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addData = (e) => {
    e.preventDefault();
  
    const { email, password } = inpval;
    if (email === "") {
      alert("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      alert("Password field is required", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      alert("Password must be at least 5 characters long", {
        position: "top-center",
      });
    } else {
      if (data && data.length) {
        const userlogin = data.filter((el) => {
          return el.email === email && el.password === password;
        });
  
        if (userlogin.length === 0) {
          console.log("Invalid details");
        } else {
          console.log("User login successful");
        
          localStorage.setItem("user_login", JSON.stringify(userlogin));
        
          navigate("/details");
        }
      }
    }
  };
  

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-7" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign IN</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
          <Sign_img />
        </section>
      </div>
    </>
  );
};
export default Login;

