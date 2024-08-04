import React from "react";
import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar, logout }) => {
  const { isSidebarOpen, setIsSidebarOpen } = sidebar;
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container hide-sidebar"
        }
      >
        <div className="container">
          <header className="sidebar-header">
            <h1>Travel Treasury</h1>
            <button
              className="toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <IoCloseCircleOutline />
            </button>
          </header>

          <ul className="nav-items">
            <li
              className="nav-item"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className="nav-item"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <NavLink to="/create-journal">Create Journal</NavLink>
            </li>
            <li
              className="nav-item"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <NavLink to="/my-journals">My Journals</NavLink>
            </li>

            <li className="nav-item" onClick={logout}>
              <button className="logout-btn" type="button">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  .hide-sidebar {
    transform: translate(-100%);
  }
  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
    background-color: #fff;
    transition: all ease-in-out 0.3s;
  }
  .container {
    height: 100%;
  }
  .sidebar-header {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 2rem;
  }
  h1 {
    text-align: center;
    color: #3a5f40;
    font-family: "Lobster", serif;
    font-weight: 400;
    font-size: 2rem;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
  }
  .nav-item {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
  a {
    color: #3a5f40;
  }
  .logout-btn {
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
    color: #3a5f40;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    .sidebar-container {
      display: none;
    }
  }
`;

export default Sidebar;
