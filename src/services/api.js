export const BASE_URL = "https://6a5b27c8ad8332e75f030c01.mockapi.io/";

export const MENU_URL = `${BASE_URL}/MenuItems`;
export const ORDERS_URL = `${BASE_URL}/Orders`;

// ---- Menu Items ----
export async function getMenuItems() {
  const res = await fetch(MENU_URL);
  if (!res.ok) throw new Error("Không tải được menu");
  return res.json();
}

export async function getMenuItemById(id) {
  const res = await fetch(`${MENU_URL}/${id}`);
  if (!res.ok) throw new Error("Không tìm thấy món");
  return res.json();
}

export async function createMenuItem(item) {
  const res = await fetch(MENU_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Thêm món thất bại");
  return res.json();
}

export async function updateMenuItem(id, item) {
  const res = await fetch(`${MENU_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Cập nhật món thất bại");
  return res.json();
}

export async function deleteMenuItem(id) {
  const res = await fetch(`${MENU_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xoá món thất bại");
  return res.json();
}

// ---- Orders ----
export async function getOrders() {
  const res = await fetch(ORDERS_URL);
  if (!res.ok) throw new Error("Không tải được danh sách đơn hàng");
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Đặt hàng thất bại");
  return res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${ORDERS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Cập nhật đơn hàng thất bại");
  return res.json();
}

