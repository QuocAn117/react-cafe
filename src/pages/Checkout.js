import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { createOrder } from "../services/api";

const CheckoutSchema = Yup.object({
  customerName: Yup.string()
    .min(2, "Tên quá ngắn")
    .required("Vui lòng nhập họ tên"),
  phone: Yup.string()
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  tableOrAddress: Yup.string().required("Vui lòng nhập bàn hoặc địa chỉ nhận"),
  paymentMethod: Yup.string().required("Vui lòng chọn phương thức thanh toán"),
  note: Yup.string(),
  agreeTerms: Yup.boolean().oneOf([true], "Bạn cần đồng ý điều khoản"),
});

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      customerName: "",
      phone: "",
      email: "",
      tableOrAddress: "",
      paymentMethod: "cash",
      note: "",
      agreeTerms: false,
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setSubmitting(true);
      try {
        const order = {
          customerName: values.customerName,
          phone: values.phone,
          email: values.email,
          tableOrAddress: values.tableOrAddress,
          paymentMethod: values.paymentMethod,
          note: values.note,
          items: cartItems.map((it) => ({
            menuItemId: it.id,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
          })),
          totalPrice,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        await createOrder(order);

        const itemsList = cartItems
          .map(
            (it) =>
              `- ${it.name} x${it.quantity} — ${(
                it.price * it.quantity
              ).toLocaleString("vi-VN")} đ`,
          )
          .join("\n");

        const paymentLabel =
          values.paymentMethod === "cash"
            ? "Tiền mặt"
            : values.paymentMethod === "card"
              ? "Thẻ ngân hàng"
              : "Ví điện tử";

        alert(
          `🎉 ĐẶT HÀNG THÀNH CÔNG!\n\n` +
            `--- THÔNG TIN KHÁCH HÀNG ---\n` +
            `Họ tên: ${values.customerName}\n` +
            `Email: ${values.email}\n` +
            `SĐT: ${values.phone}\n` +
            `Bàn/Địa chỉ: ${values.tableOrAddress}\n` +
            `Thanh toán: ${paymentLabel}\n` +
            (values.note ? `Ghi chú: ${values.note}\n` : "") +
            `\n--- CHI TIẾT ĐƠN HÀNG ---\n` +
            `${itemsList}\n\n` +
            `--- TỔNG KẾT ---\n` +
            `Tổng số món: ${cartItems.reduce(
              (sum, it) => sum + it.quantity,
              0,
            )}\n` +
            `Tổng tiền: ${totalPrice.toLocaleString("vi-VN")} đ`,
        );

        clearCart();
        navigate("/");
      } catch (err) {
        setSubmitError(
          "Đặt hàng thất bại.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Giỏ hàng trống, không có gì để thanh toán.</h3>
        <Link to="/menu" className="btn btn-primary mt-3">
          Xem Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Thanh toán</h2>
      <div className="row">
        <div className="col-md-7">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Họ và tên</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.customerName && formik.errors.customerName
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("customerName")}
              />
              <div className="invalid-feedback">
                {formik.errors.customerName}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.phone && formik.errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("phone")}
              />
              <div className="invalid-feedback">{formik.errors.phone}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              <div className="invalid-feedback">{formik.errors.email}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Bàn / Địa chỉ nhận</label>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.tableOrAddress && formik.errors.tableOrAddress
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="VD: Bàn số 5, hoặc địa chỉ giao hàng"
                {...formik.getFieldProps("tableOrAddress")}
              />
              <div className="invalid-feedback">
                {formik.errors.tableOrAddress}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phương thức thanh toán</label>
              <select
                className={`form-select ${
                  formik.touched.paymentMethod && formik.errors.paymentMethod
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("paymentMethod")}
              >
                <option value="cash">Tiền mặt</option>
                <option value="card">Thẻ ngân hàng</option>
                <option value="e-wallet">Ví điện tử</option>
              </select>
              <div className="invalid-feedback">
                {formik.errors.paymentMethod}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ghi chú</label>
              <textarea
                className="form-control"
                rows="2"
                {...formik.getFieldProps("note")}
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className={`form-check-input ${
                  formik.touched.agreeTerms && formik.errors.agreeTerms
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("agreeTerms")}
                checked={formik.values.agreeTerms}
              />
              <label className="form-check-label">
                Tôi đồng ý với điều khoản đặt món của quán
              </label>
              <div className="invalid-feedback">{formik.errors.agreeTerms}</div>
            </div>

            {submitError && (
              <div className="alert alert-danger">{submitError}</div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting}
            >
              {submitting ? "Đang gửi đơn..." : "Xác nhận đặt hàng"}
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng của bạn</h5>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map((it) => (
                  <li
                    key={it.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {it.name} x{it.quantity}
                    </span>
                    <span>
                      {(it.price * it.quantity).toLocaleString("vi-VN")} đ
                    </span>
                  </li>
                ))}
              </ul>
              <h5 className="d-flex justify-content-between">
                <span>Tổng cộng</span>
                <span>{totalPrice.toLocaleString("vi-VN")} đ</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
