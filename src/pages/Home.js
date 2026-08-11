import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import { getMenuItems } from "../services/api";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMenuItems()
      .then((data) => setFeatured(data.filter((it) => it.isFeatured && it.isAvailable)))
      .catch(() =>
        setError(
          "Không tải được menu."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">☕ The Roasted Bean</h1>
          <p className="lead">
            Cà phê rang xay thủ công, đặt món trước, không cần xếp hàng.
          </p>
          <Link to="/menu" className="btn btn-light btn-lg mt-2">
            Xem Menu
          </Link>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4">Món nổi bật</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {loading && <p className="text-muted">Đang tải món nổi bật...</p>}
          {!loading && !error && featured.length === 0 && (
            <p className="text-muted">Chưa có món nổi bật nào.</p>
          )}
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
