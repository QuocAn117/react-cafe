# ☕ The Roasted Bean — Cafe Ordering & Menu Management System

The Roasted Bean là một ứng dụng quản lý và đặt món quán cà phê được xây dựng bằng ReactJS. Dự án này được phát triển nhằm giải quyết bài toán tối ưu hóa quy trình gọi món, số hóa menu và cung cấp bảng điều khiển quản trị cho chủ quán.

---

## 📸 Giao diện ứng dụng 

![Trang chủ](./docs/home.jpg)
![Giỏ hàng & Thanh toán](./docs/checkout.jpg)
![Admin Dashboard](./docs/admin-dashboard.jpg)

---

## 🚀 Công nghệ & Kỹ thuật cốt lõi 

| Nhóm tính năng / Kỹ thuật | Công nghệ áp dụng | Ứng dụng trong dự án |
|---|---|---|
| **Xây dựng UI & Routing** | `ReactJS`, `react-router-dom` | Tạo giao diện dạng Card, hiển thị chi tiết món, điều hướng trang không reload. |
| **Quản lý State Toàn cục** | `Context API` | Xử lý `AuthContext` (Đăng nhập), `ThemeContext` (Dark/Light mode), `CartContext` (Giỏ hàng). |
| **Xử lý & Validate Form** | `Formik`, `Yup` | Ràng buộc dữ liệu đầu vào, báo lỗi (validation) cho form Liên hệ, Checkout, và Đăng nhập. |
| **Tương tác dữ liệu (API)** | `Fetch API`, `mockapi.io` | Thực hiện các thao tác CRUD (Create, Read, Update, Delete) cho Menu và Đơn hàng. |
| **Bảo mật** | `ProtectedRoute` | Phân quyền truy cập, chặn người dùng vãng lai truy cập vào route `/admin/dashboard`. |

---

## 1. Bối cảnh 

Quán cà phê **The Roasted Bean** hiện quản lý menu và đơn hàng thủ công (ghi giấy / Excel).
Khách phải hỏi trực tiếp nhân viên mới biết món nào còn, giá bao nhiêu, và không có cách nào đặt trước online. Quản lý quán cũng không có công cụ để thêm/sửa/xoá món ăn nhanh khi đổi menu theo mùa, dẫn đến sai sót giá và tồn kho.

## 2. Vấn đề cần giải quyết 

- Khách hàng không xem được menu, giá, mô tả món trước khi đến quán.
- Không có giỏ hàng / đặt món trước → khách phải xếp hàng chờ gọi món trực tiếp.
- Nhân viên/quản lý không có công cụ quản lý menu tập trung (thêm, sửa, xoá).
- Không lưu lại lịch sử đơn đã đặt để đối chiếu khi có khiếu nại.
- Không phân quyền: bất kỳ ai cũng có thể "chỉnh sửa" menu nếu không có hệ thống đăng nhập.

## 3. Đối tượng sử dụng 

- **Customer (Khách hàng)** — không cần đăng nhập: xem menu, lọc theo danh mục, xem chi tiết món, thêm vào giỏ, đặt hàng (checkout), gửi liên hệ/góp ý.
- **Admin (Quản lý quán)** — cần đăng nhập: quản lý toàn bộ món trong menu (CRUD), xem danh sách đơn hàng khách đã đặt.

## 4. Yêu cầu chức năng (Functional Requirements)

### Dành cho Khách hàng (Customer)
- Xem trang chủ giới thiệu quán và các món nổi bật (Featured).
- Xem toàn bộ menu dạng lưới card (ảnh, tên, giá, danh mục, rating).
- Lọc menu theo danh mục: Coffee, Tea, Cold Brew, Pastry.
- Tìm kiếm món theo tên (search box).
- Xem trang chi tiết 1 món: mô tả, giá, size, chọn số lượng, nút "Thêm vào giỏ".
- Xem giỏ hàng: tăng/giảm số lượng, xoá món, xem tổng tiền.
- Đặt hàng (Checkout) qua form Formik + Yup: họ tên, SĐT, email, địa chỉ/bàn nhận, phương thức thanh toán, ghi chú, đồng ý điều khoản → gửi đơn lên mockapi.io (`Orders`).
- Gửi form liên hệ/góp ý (Formik + Yup validate).
- Chuyển đổi giao diện Light/Dark (ThemeContext).

### Dành cho Quản trị viên (Admin)
- Đăng nhập bằng form Formik + Yup.
- Trang Dashboard (route được bảo vệ — `ProtectedRoute`):
  - Xem danh sách toàn bộ món (GET API).
  - Thêm món mới (POST).
  - Sửa món (PUT): tên, ảnh, danh mục, giá, mô tả, còn hàng hay không (`isAvailable`).
  - Xoá món (DELETE).
- Xem danh sách đơn hàng khách đã đặt (GET `Orders`), cập nhật trạng thái đơn.
- Đăng xuất.

---

## 5. Thiết lập mockAPI.io 

Hệ thống sử dụng RESTful API từ mockAPI.io. 
1. Cấu trúc bảng **`MenuItems`**:
```json
{
  "id": "string",
  "name": "string",
  "category": "string",        
  "price": "number",
  "image": "string",
  "description": "string",
  "rating": "number",          
  "isAvailable": "boolean",
  "isFeatured": "boolean"
}
```

2. Cấu trúc bảng **`Orders`**:
```json
{
  "id": "string",
  "customerName": "string",
  "phone": "string",        
  "email": "string",
  "tableOrAddress": "string",
  "paymentMethod": "string",
  "note": "string",          
  "items": "array",
  "totalPrice": "number",
  "status": "string",
  "createdAt": "string"
}
```

