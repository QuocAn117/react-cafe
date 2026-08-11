import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Giỏ hàng của bạn đang trống</h3>
        <Link to="/menu" className="btn btn-primary mt-3">
          Xem Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Giỏ hàng</h2>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Món</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((it) => (
            <tr key={it.id}>
              <td className="d-flex align-items-center gap-2">
                <img
                  src={it.image}
                  alt={it.name}
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                  className="rounded"
                />
                {it.name}
              </td>
              <td>{it.price.toLocaleString("vi-VN")} đ</td>
              <td style={{ width: 140 }}>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQuantity(it.id, it.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{it.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQuantity(it.id, it.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{(it.price * it.quantity).toLocaleString("vi-VN")} đ</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(it.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end align-items-center gap-3">
        <h4>Tổng cộng: {totalPrice.toLocaleString("vi-VN")} đ</h4>
        <button
          className="btn btn-success"
          onClick={() => navigate("/checkout")}
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
}
