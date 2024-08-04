import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data.user;
  } catch (error) {
    return redirect("/login");
  }
};

const SharedLayout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    navigate("/login");
    await customFetch.get("/auth/logout");
    toast.success("Logged Out");
  };
  const user = useLoaderData();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Sidebar logout={logout} sidebar={{ isSidebarOpen, setIsSidebarOpen }} />
      <Navbar logout={logout} sidebar={{ isSidebarOpen, setIsSidebarOpen }} />
      <div>
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default SharedLayout;
