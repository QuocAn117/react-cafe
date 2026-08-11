import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/api";

const STATUS_OPTIONS = ["pending", "confirmed", "completed"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = () => {
    setLoading(true);
    getOrders()
      .then((data) =>
        setOrders(
          [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        ),
      )
      .catch(() => setError("Không tải được đơn hàng."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      loadOrders();
    } catch (err) {
      setError("Cập nhật trạng thái thất bại.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Đơn hàng khách đặt</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted">Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-3" key={order.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6>
                  {order.customerName} — {order.phone}
                </h6>
                <select
                  className="form-select form-select-sm w-auto"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-muted small mb-1">
                {order.email} · {order.tableOrAddress} · {order.paymentMethod}
              </p>
              {order.note && (
                <p className="small mb-1 text-danger fw-bold">
                  Ghi chú: {order.note}
                </p>
              )}
              <ul className="mb-1 small">
                {(order.items || []).map((it, idx) => (
                  <li key={idx}>
                    {it.name} x{it.quantity} —{" "}
                    {(it.price * it.quantity).toLocaleString("vi-VN")} đ
                  </li>
                ))}
              </ul>
              <p className="fw-bold mb-0">
                Tổng: {Number(order.totalPrice).toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
