*Choose language / Chọn ngôn ngữ:* [English](#english-version) | [Tiếng Việt](#vietnamese-version)

---

<h2 id="english-version">🇬🇧 English Version</h2>

# ☕ The Roasted Bean — Cafe Ordering & Menu Management System

The Roasted Bean is a cafe menu management and ordering application built with ReactJS. This project was developed to solve the problem of optimizing the ordering process, digitizing the menu, and providing an administrative dashboard for the store owner.

---

## 📸 Application Interface (Screenshots)

![Home Page](./docs/home.jpg)
![Cart & Checkout](./docs/checkout.jpg)
![Admin Dashboard](./docs/admin-dashboard.jpg)

---

## 🚀 Core Technologies & Techniques

| Feature Group / Technique | Applied Technology | Application in Project |
|---|---|---|
| **UI Building & Routing** | `ReactJS`, `react-router-dom` | Creating Card-based UI, displaying item details, and navigating pages without reloading. |
| **Global State Management** | `Context API` | Handling `AuthContext` (Login), `ThemeContext` (Dark/Light mode), and `CartContext` (Shopping Cart). |
| **Form Handling & Validation** | `Formik`, `Yup` | Validating input data and displaying error messages for Contact, Checkout, and Login forms. |
| **Data Interaction (API)** | `Fetch API`, `mockapi.io` | Performing CRUD (Create, Read, Update, Delete) operations for Menu items and Orders. |
| **Security** | `ProtectedRoute` | Access control, blocking unauthorized users from accessing the `/admin/dashboard` route. |

---

## 1. Context

**The Roasted Bean** cafe currently manages its menu and orders manually (paper / Excel).
Customers have to ask staff directly to know what is available and the prices, with no way to order online in advance. Store managers also lack tools to quickly add/edit/delete food items when changing seasonal menus, leading to pricing and inventory errors.

## 2. Problems to Solve

- Customers cannot view the menu, prices, or item descriptions before arriving at the cafe.
- Lack of a shopping cart / pre-ordering system → customers must queue to order in person.
- Staff/managers lack a centralized menu management tool (add, edit, delete).
- Order history is not saved for cross-referencing in case of complaints.
- No access control: anyone could "edit" the menu without a login system.

## 3. Target Users

- **Customer** — no login required: view menu, filter by category, view item details, add to cart, place an order (checkout), send contact/feedback forms.
- **Admin (Store Manager)** — login required: manage all menu items (CRUD), view the list of customer orders.

## 4. Functional Requirements

### For Customers
- View the homepage introducing the cafe and featured items.
- View the full menu in a card grid layout (image, name, price, category, rating).
- Filter menu by category: Coffee, Tea, Cold Brew, Pastry.
- Search items by name (search box).
- View individual item details page: description, price, size, select quantity, "Add to Cart" button.
- View shopping cart: increase/decrease quantity, remove items, view total price.
- Place an order (Checkout) via Formik + Yup form: full name, phone number, email, delivery address/table, payment method, notes, terms agreement → send order to mockapi.io (`Orders`).
- Send contact/feedback forms (validated with Formik + Yup).
- Toggle Light/Dark UI theme (ThemeContext).

### For Administrators (Admin)
- Login using Formik + Yup form.
- Dashboard Page (protected route — `ProtectedRoute`):
  - View the entire list of menu items (GET API).
  - Add new items (POST).
  - Edit items (PUT): name, image, category, price, description, availability (`isAvailable`).
  - Delete items (DELETE).
- View the list of customer orders (GET `Orders`), update order statuses.
- Logout.

---

## 5. mockAPI.io Setup

The system utilizes a RESTful API from mockAPI.io. 
1. **`MenuItems`** Table Structure:
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

2. **`Orders`** Table Structure:
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

<br><br>

---

<h2 id="vietnamese-version">🇻🇳 Phiên bản Tiếng Việt</h2>

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
