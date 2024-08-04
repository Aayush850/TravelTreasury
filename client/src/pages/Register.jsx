import React from "react";
import styled from "styled-components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import image from "../assets/images/background.jpg";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/register", data);
    toast.success("User registered.");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className="content">
            <div className="quote">
              <h3>Capture</h3>
              <h3>Explore</h3>
              <h3>Reflect</h3>
            </div>
            <div className="form">
              <header>
                <h1>Travel Treasury</h1>
              </header>
              <Form method="post">
                <div className="form-row">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username "
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  Register
                </button>
                <p>
                  Already an user? <Link to="/login">Login</Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h1 {
    text-align: center;
    color: #3a5f40;
    font-family: "Lobster", serif;
    font-weight: 400;
    font-size: 3rem;
  }
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    width: 90%;
    margin: 0 auto;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-height: 80vh;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 10px;
    margin: 1rem 0;
  }
  .quote {
    background: linear-gradient(rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 0.5)),
      url(${image});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border-radius: 10px;
    opacity: 0.9;
  }
  h3 {
    text-transform: uppercase;
    color: #fff;
    font-family: "Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 3px;
    line-height: 1.3;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem;
  }

  input {
    border: none;
    border-bottom: solid 1px #acacac;
    outline: none;
    font-size: 1.2rem;
  }

  input:focus {
    border: none;
    outline: none;
    border-bottom: solid 1px #acacac;
  }
  .form-row {
    margin: 1rem 0;
  }
  p {
    text-align: center;
  }
  .submit-btn {
    width: 100%;
  }

  @media (max-width: 768px) {
    .content {
      display: block;
      min-height: auto;
    }
    .quote {
      display: none;
    }
  }
`;

export default Register;
