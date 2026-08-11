import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LoginSchema = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
  password: Yup.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState("");
  const { from } = location.state || {};

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoginError("");
      const result = login(values.username, values.password);
      if (result.success) {
        navigate(from || "/admin/dashboard", { replace: true });
      } else {
        setLoginError(result.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-4 text-center">Đăng nhập Quản lý</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.username && formik.errors.username
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps("username")}
          />
          <div className="invalid-feedback">{formik.errors.username}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            {...formik.getFieldProps("password")}
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button
          type="submit"
          className="btn btn-secondary w-100"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
