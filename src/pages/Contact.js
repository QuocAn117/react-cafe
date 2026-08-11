import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object({
  name: Yup.string().min(2, "Tên quá ngắn").required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: Yup.string().matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ").required("Vui lòng nhập số điện thoại"),
  message: Yup.string()
    .min(10, "Nội dung cần tối thiểu 10 ký tự")
    .required("Vui lòng nhập nội dung"),
  agree: Yup.boolean().oneOf([true], "Bạn cần đồng ý để gửi liên hệ"),
});

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agree: false,
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {
      alert(
        `🎉 GỬI LIÊN HỆ THÀNH CÔNG!\n\n` +
          `--- THÔNG TIN LIÊN HỆ ---\n` +
          `Họ tên: ${values.name}\n` +
          `Email: ${values.email}\n` +
          (values.phone ? `SĐT: ${values.phone}\n` : "") +
          `\n--- NỘI DUNG ---\n` +
          `${values.message}\n\n` +
          `Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.`,
      );
      resetForm();
    },
  });

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Liên hệ / Góp ý</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            {...formik.getFieldProps("name")}
          />
          <div className="invalid-feedback">{formik.errors.name}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            {...formik.getFieldProps("email")}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
            }`}
            {...formik.getFieldProps("phone")}
          />
          <div className="invalid-feedback">{formik.errors.phone}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Nội dung</label>
          <textarea
            rows="4"
            className={`form-control ${
              formik.touched.message && formik.errors.message
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps("message")}
          />
          <div className="invalid-feedback">{formik.errors.message}</div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className={`form-check-input ${
              formik.touched.agree && formik.errors.agree ? "is-invalid" : ""
            }`}
            {...formik.getFieldProps("agree")}
            checked={formik.values.agree}
          />
          <label className="form-check-label">
            Tôi đồng ý cho quán liên hệ lại với tôi
          </label>
          <div className="invalid-feedback">{formik.errors.agree}</div>
        </div>

        <button type="submit" className="btn btn-dark">
          Gửi liên hệ
        </button>
      </form>
    </div>
  );
}
