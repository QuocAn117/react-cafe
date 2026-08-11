import React, { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { getMenuItems } from "../services/api";
import { CATEGORIES } from "../constants";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMenuItems()
      .then((data) => setItems(data))
      .catch(() =>
        setError(
          "Không tải được menu từ mockapi.io."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((it) => {
    const matchCategory =
      activeCategory === "All" || it.category === activeCategory;
    const matchSearch = it.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Menu</h2>

      <div className="row mb-4 g-2">
        <div className="col-md-8">
          <div className="btn-group flex-wrap" role="group">
            <button
              className={`btn btn-sm ${
                activeCategory === "All" ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setActiveCategory("All")}
            >
              Tất cả
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`btn btn-sm ${
                  activeCategory === c ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tìm món..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Đang tải menu...</p>}

      <div className="row">
        {!loading && !error && filtered.length === 0 && (
          <p className="text-muted">Không tìm thấy món phù hợp.</p>
        )}
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
