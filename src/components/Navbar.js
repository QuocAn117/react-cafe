import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          ☕ The Roasted Bean
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menu
              </NavLink>
            </li>
            {!user?.isAdmin && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Liên hệ
              </NavLink>
            </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dashboard">
                  Quản lý Menu
                </NavLink>
              </li>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/orders">
                  Đơn hàng
                </NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={toggleTheme}
              title="Chuyển giao diện sáng/tối"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <NavLink
              to="/cart"
              className="btn btn-sm btn-outline-primary position-relative"
            >
              🛒 Giỏ hàng
              {totalItems > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">
                  {totalItems}
                </span>
              )}
            </NavLink>
            {user?.isAdmin ? (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleLogout}
              >
                Đăng xuất ({user.username})
              </button>
            ) : (
              <NavLink className="btn btn-sm btn-outline-secondary" to="/login">
                Đăng nhập
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
