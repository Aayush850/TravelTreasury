import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
const Home = () => {
  const { user } = useOutletContext();
  const name = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  return (
    <Wrapper>
      <section className="home">
        <div className="home-content container">
          <header className="header">
            <h1>Welcome, {name}</h1>
            <h2>Create your next journal entry here.</h2>
            <Link to="/create-journal" className="btn">
              New Journal
            </Link>
          </header>
          <img src={main} alt="" className="home-image" />
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h1 {
    font-size: 3rem;
  }
  .home {
    height: calc(100vh - 5rem);
  }
  .home-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 2rem;
  }
  .header {
    width: 40%;
  }
  img {
    width: 50%;
  }
  .btn {
    display: inline-block;
    margin: 1rem 0;
    padding: 0.8em 1.2em;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #3a5f40;
    color: #fff;
    font-size: 1rem;
    border-radius: 8px;
    font-family: "Nunito", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  @media (max-width: 768px) {
    .home-image {
      display: none;
    }
    .header {
      width: 100%;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
    }
  }
`;
export default Home;
