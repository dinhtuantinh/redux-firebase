import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutInit } from "../redux/actions/actions";
import "./css/Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  const { currentUser: user } = useSelector((state) => ({ ...state.user }));

  const dispatch = useDispatch();

  const handleAuth = () => {
    dispatch(logoutInit());
  };

  useEffect(() => {
    
    if (location.pathname === "/") {
      setActiveTab("Product");
    } else if (location.pathname === "/addProduct") {
      setActiveTab("AddProduct");
    } else if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/login") {
      setActiveTab("Signin");
    }
  }, [location]);
  return (
    <div className="header">
      <Link to="/">
        <p className="logo">TuanTinh App</p>
      </Link>
      <div className="header-right">
        <Link to="/home">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Trang chủ
            </p>
          </Link>
          <Link to="/">
            <p
              className={`${activeTab === "Product" ? "active" : ""}`}
              onClick={() => setActiveTab("Product")}
            >
              Sản phẩm
            </p>
          </Link>
          <Link to="/addProduct">
            <p
              className={`${activeTab === "AddProduct" ? "active" : ""}`}
              onClick={() => setActiveTab("AddProduct")}
            >
              Thêm sản phẩm
            </p>
          </Link>
          {user ? (
            <p style={{ cursor: "pointer" }} onClick={handleAuth}>
              Đăng xuất
            </p>
          ) : (
            <Link to="/login">
              <p
                className={`${activeTab === "Signin" ? "active" : ""}`}
                onClick={() => setActiveTab("Signin")}
              >
                Đăng nhập
              </p>
            </Link>
          )}
        </div>
    </div>
  );
};

export default Header;
