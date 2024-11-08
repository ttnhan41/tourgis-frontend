import Wrapper from "../assets/wrappers/Admin";
import { Link } from "react-router-dom";
import React, { Suspense, useState } from "react";
import { Menu, Dropdown, Button } from "antd";

import Dashboard from "./AdminDashboard";
// import Place from "./AdminPlace";
// import User from "./AdminUser";

import { Logo } from "../components";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdPlace } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";


// sử dụng React.lazy để load các component khi cần thiết
const Place = React.lazy(() => import("./AdminPlace"))
const User = React.lazy(() => import("./AdminUser"))


const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const handleSeeAll = (tab) => {
    setSelectedTab(tab);
  }

  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <Dashboard onSeeAll={handleSeeAll} />;
      case 'place':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Place />
          </Suspense>
        )
      case 'user':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <User />
          </Suspense>
        );
      default:
        return <Dashboard onSeeAll={handleSeeAll} />;
    }
  }

  return (
    <Wrapper>
      <div className="wrapper">
        <div className="sidebar">
          <div className="home-url">
            <div className="logo">
              <Logo />
            </div>
            <h2>Tour Gis</h2>
          </div>
          <Menu
            mode="inline"
            // defaultSelectedKeys={['dashboard']} 
            selectedKeys={[selectedTab]} //thay defaultSelectedKeys bằng selectedKeys để đồng bộ hóa lựa chọn trang khi xử lý handleSeeAll
            className="navigate"
          >
            <Menu.Item key="dashboard" onClick={() => setSelectedTab('dashboard')} className="item">
              <TbLayoutDashboardFilled />&nbsp;Dashboard
            </Menu.Item>
            <Menu.Item key="place" onClick={() => setSelectedTab('place')} className="item">
              <MdPlace />&nbsp;Place
            </Menu.Item>
            <Menu.Item key="user" onClick={() => setSelectedTab('user')} className="item">
              <FaUserCog />&nbsp;User
            </Menu.Item>
          </Menu>
        </div>
        <div className="main-content">
          <header className="header">
            <h3>Dashboard</h3>
            <div className="search-box">
              <div className="input-box">
                <CiSearch className="search-icon" />
                <input type="text" placeholder="Seach something" />
              </div>
            </div>

            <div className="account">
              {/* <FaRegUserCircle className="user-icon" /> */}
              <div className="user-info">
                <h5>Họ Tên</h5>
                <p>Role: Admin</p>
              </div>
              <Button className="btn"><Link to="/">Đăng xuất</Link></Button>
            </div>
          </header>
          <div className="content">
            {renderContent()}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Admin;
