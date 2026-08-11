import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemById } from "../services/api";
import { CartContext } from "../contexts/CartContext";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    getMenuItemById(id)
      .then((data) => setItem(data))
      .catch(() =>
        setError(
          "Không tìm thấy món này.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Đang tải chi tiết món...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error || "Không tìm thấy món."}
        </div>
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  
  return (
    <div className="container mt-4">
      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>
      <div className="row">
        <div className="col-md-5">
          <img src={item.image} alt={item.name} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h2>{item.name}</h2>
          <p className="text-muted">{item.category}</p>
          <p>{"⭐".repeat(item.rating)}</p>
          <p>{item.description}</p>
          <h4 className="text-primary">
            {item.price.toLocaleString("vi-VN")} đ
          </h4>
          {!item.isAvailable ? (
            <div className="alert alert-secondary">
              Món này hiện đang hết hàng.
            </div>
          ) : (
            <>
              <div className="d-flex align-items-center gap-2 mb-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Thêm vào giỏ
              </button>
              {added && (
                <span className="text-success ms-3">
                  ✓ Đã thêm vào giỏ hàng
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}