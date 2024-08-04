import React from "react";
import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Error = () => {
  const error = useRouteError();

  return (
    <Wrapper>
      <div className="container">
        {error.status === 404 ? (
          <h1>Oops! It's a dead end!</h1>
        ) : (
          <h1>Oops! An error occured!</h1>
        )}

        <Link to="/" className="submit-btn">
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    text-align: center;
    padding: 3rem;
  }
`;

export default Error;
