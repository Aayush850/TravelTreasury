import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";

const Navbar = ({ logout, sidebar }) => {
  const { isSidebarOpen, setIsSidebarOpen } = sidebar;
  return (
    <Wrapper>
      <div className="container nav-container">
        <button
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <BiMenuAltLeft />
        </button>
        <header>
          <h1>Travel Treasury</h1>
        </header>
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create-journal">Create Journal</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/my-journals">My Journals</NavLink>
          </li>

          <li className="nav-item" onClick={logout}>
            <button className="logout-btn" type="button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: 5rem;
  background-color: #3a5f40;
  position: sticky;
  top: 0;

  h1 {
    text-align: center;
    color: #fff;
    font-family: "Lobster", serif;
    font-weight: 400;
    font-size: 2rem;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .nav-items {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-item {
    margin: 0 1rem;
    font-size: 1.3rem;
  }
  a {
    color: #bbd8c0;
  }
  .logout-btn {
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
    color: #bbd8c0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
  }
  .active {
    color: #fff;
  }
  .toggle-btn {
    background-color: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 2rem;
    display: none;
  }

  @media (max-width: 768px) {
    .nav-items {
      display: none;
    }
    .toggle-btn {
      display: inline-block;
    }
    header {
      margin: 0 auto;
    }
  }
`;
export default Navbar;
