import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sign_img from "./Sign_img";
import CryptoJS from "crypto-js";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    account: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { name, email, date, account, password } = inpval;

    if (name === "") {
      toast.error(" name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (date === "") {
      toast.error("date field is requred", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (account === "") {
      toast.error("account type is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      try {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inpval),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("Data added successfully:", responseData);
          setInpval({
            name: "",
            email: "",
            date: "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Failed to add data:", error);
      }
      // console.log("data added succesfully");
      history("/login");
      // localStorage.setItem("userbudget",JSON.stringify([...data,inpval]));
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  value={inpval.name}
                  placeholder="Enter Your Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  value={inpval.email}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  onChange={getdata}
                  name="date"
                  value={inpval.date}
                  type="date"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicSelect">
                <Form.Label>Select Type</Form.Label>
                <Form.Select
                  onChange={getdata}
                  name="account"
                  value={inpval.account}
                  aria-label="Select Type"
                >
                  <option value="">Choose Account Type</option>
                  <option value="personal">Personal</option>
                  <option value="family">Family</option>
                  <option value="others">Others</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  value={inpval.password}
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
            <p className="mt-3">
              Already Have an Account{" "}
              <span>
                <NavLink to="/login">SignIn</NavLink>
              </span>{" "}
            </p>
          </div>
          <Sign_img />
        </section>
        <toastContainer />
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
