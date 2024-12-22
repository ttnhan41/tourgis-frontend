import Wrapper from "../assets/wrappers/Admin";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import { Menu, Dropdown, Button } from "antd";

import Dashboard from "./AdminDashboard";
// import Place from "./AdminPlace";
// import User from "./AdminUser";

import { Logo } from "../components";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdPlace } from "react-icons/md";
import { FaUserCog, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const [user, appStats] = await Promise.all([
      customFetch.get("/users/current-user").then((res) => res.data),
      customFetch.get("/users/admin/app-stats").then((res) => res.data),
    ]);
    return [user, appStats];
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// sử dụng React.lazy để load các component khi cần thiết
const Place = React.lazy(() => import("./AdminPlace"));
const User = React.lazy(() => import("./AdminUser"));

const Admin = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const data = useLoaderData(); // Lấy dữ liệu từ loader Admin
  const { user } = data[0];
  const appStats = data[1];

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Đăng xuất thành công");
  };

  const [selectedTab, setSelectedTab] = useState("dashboard");

  const handleSeeAll = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <Dashboard onSeeAll={handleSeeAll} />;
      case "place":
        return (
    <Suspense fallback={<div>Loading...</div>}>
            <Place />
          </Suspense>
        );
        // return <Place />;
      case "user":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <User />
    </Suspense>
        );
        // return <User />;
      default:
        return <Dashboard onSeeAll={handleSeeAll} />;
    }
  };

  // Tạo mảng items cho Menu
  const menuItems = [
    {
      key: 'dashboard',
      icon: <TbLayoutDashboardFilled />,
      label: "Dashboard",
      onClick: () => setSelectedTab("dashboard"),
      className: "item",
    },
    {
      key: "place",
      icon: <MdPlace />,
      label: "Place",
      onClick: () => setSelectedTab("place"),
      className: "item",
    },
    {
      key: "user",
      icon: <FaUserCog />,
      label:"User",
      onClick: () => setSelectedTab("user"),
      className: "item",
    },
  ]

  return (
    <Wrapper>
      <div className="wrapper">
        <div className="sidebar">
          <div className="home-url">
            <div className="logo">
              <Logo />
            </div>
            {/* <h2>Tour Gis</h2> */}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedTab]} // Đồng bộ hóa lựa chọn tab
            items={menuItems} // Thay thế children bằng items
            className="navigate"
          />
        </div>
        <div className="main-content">
          <header className="header">
            <h3>Admin</h3>
            <div className="search-box">
              <div className="input-box">
                <CiSearch className="search-icon" />
                <input type="text" placeholder="Seach something" />
              </div>
            </div>

            <div className="account-menu-btn-container">
              <button
                type="button"
                className="btn menu-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
              </button>
              <div className={showMenu ? "dropdown show-dropdown" : "dropdown"}>
                <button type="button" className="dropdown-btn" /*onClick={}*/>
                  Tài khoản
                </button>
                {user.role === "admin" ? (
                  <button
                    type="button"
                    className="dropdown-btn"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </button>
                ) : null}
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={logoutUser}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </header>
          <div className="content">{renderContent()}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Admin;
