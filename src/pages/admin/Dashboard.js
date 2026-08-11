import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../services/api";
import { CATEGORIES } from "../../constants";

const ItemSchema = Yup.object({
  name: Yup.string().required("Bắt buộc"),
  image: Yup.string().url("URL không hợp lệ").required("Bắt buộc"),
  category: Yup.string().required("Bắt buộc"),
  price: Yup.number()
    .typeError("Phải là số")
    .positive("Giá phải lớn hơn 0")
    .required("Bắt buộc"),
  description: Yup.string().required("Bắt buộc"),
  rating: Yup.number().min(1).max(5).required("Bắt buộc"),
});

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = () => {
    setLoading(true);
    getMenuItems()
      .then((data) => setItems(data))
      .catch(() =>
        setError(
          "Không tải được menu từ mockapi.io."
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editingItem || {
      name: "",
      image: "",
      category: CATEGORIES[0],
      price: "",
      description: "",
      rating: 5,
      isAvailable: true,
      isFeatured: false,
    },
    validationSchema: ItemSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values, price: Number(values.price) };
        if (editingItem) {
          await updateMenuItem(editingItem.id, payload);
        } else {
          await createMenuItem(payload);
        }
        resetForm();
        setEditingItem(null);
        loadItems();
      } catch (err) {
        setError("Lưu món thất bại. Vui lòng thử lại.");
      }
    },
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xoá món này?")) return;
    try {
      await deleteMenuItem(id);
      loadItems();
    } catch (err) {
      setError("Xoá món thất bại.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Menu (Admin)</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            {editingItem ? `Sửa món: ${editingItem.name}` : "Thêm món mới"}
          </h5>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">Tên món</label>
                <input
                  className={`form-control form-control-sm ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                <div className="invalid-feedback">{formik.errors.name}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Ảnh (URL)</label>
                <input
                  className={`form-control form-control-sm ${
                    formik.touched.image && formik.errors.image
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("image")}
                />
                <div className="invalid-feedback">{formik.errors.image}</div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Danh mục</label>
                <select
                  className="form-select form-select-sm"
                  {...formik.getFieldProps("category")}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Giá (đ)</label>
                <input
                  type="number"
                  className={`form-control form-control-sm ${
                    formik.touched.price && formik.errors.price
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("price")}
                />
                <div className="invalid-feedback">{formik.errors.price}</div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="form-control form-control-sm"
                  {...formik.getFieldProps("rating")}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Mô tả</label>
                <textarea
                  rows="2"
                  className={`form-control form-control-sm ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("description")}
                />
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              </div>
              <div className="col-md-6 form-check ms-2 mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={formik.values.isAvailable}
                  onChange={(e) =>
                    formik.setFieldValue("isAvailable", e.target.checked)
                  }
                />
                <label className="form-check-label">Còn hàng</label>
              </div>
              <div className="col-md-6 form-check ms-2 mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={formik.values.isFeatured}
                  onChange={(e) =>
                    formik.setFieldValue("isFeatured", e.target.checked)
                  }
                />
                <label className="form-check-label">Món nổi bật</label>
              </div>
            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-dark btn-sm me-2">
                {editingItem ? "Lưu thay đổi" : "Thêm món"}
              </button>
              {editingItem && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleCancelEdit}
                >
                  Huỷ
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <h5>Danh sách món ({items.length})</h5>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>
                  <img
                    src={it.image}
                    alt={it.name}
                    style={{ width: 40, height: 40, objectFit: "cover" }}
                    className="rounded"
                  />
                </td>
                <td>{it.name}</td>
                <td>{it.category}</td>
                <td>{Number(it.price).toLocaleString("vi-VN")} đ</td>
                <td>
                  {it.isAvailable ? (
                    <span className="badge bg-success">Còn hàng</span>
                  ) : (
                    <span className="badge bg-secondary">Hết hàng</span>
                  )}
                  {it.isFeatured && (
                    <span className="badge bg-warning text-dark ms-1">
                      Nổi bật
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => handleEdit(it)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(it.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
