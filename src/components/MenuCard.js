import React from "react";
import { Link } from "react-router-dom";

export default function MenuCard({ item }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={item.image}
          className="card-img-top"
          alt={item.name}
          style={{ height: 180, objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <p className="text-muted mb-1">{item.category}</p>
          <p className="mb-1">{"⭐".repeat(item.rating)}</p>
          <p className="fw-bold mb-2">
            {item.price.toLocaleString("vi-VN")} đ
          </p>
          {!item.isAvailable && (
            <span className="badge bg-secondary mb-2 align-self-start">
              Hết hàng
            </span>
          )}
          <Link
            to={`/menu/${item.id}`}
            className="btn btn-outline-primary btn-sm mt-auto"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
