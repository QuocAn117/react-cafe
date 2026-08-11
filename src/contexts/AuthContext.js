import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const ADMIN_ACCOUNT = {
  username: "admin",
  password: "admin123",
  fullName: "Administrator",
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cafe_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("cafe_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cafe_user");
    }
  }, [user]);

  const login = (username, password) => {
    if (
      username === ADMIN_ACCOUNT.username &&
      password === ADMIN_ACCOUNT.password
    ) {
      const safeUser = {
        username: ADMIN_ACCOUNT.username,
        fullName: ADMIN_ACCOUNT.fullName,
        isAdmin: true,
      };
      setUser(safeUser);
      return { success: true, isAdmin: true };
    }
    return { success: false, message: "Sai tên đăng nhập hoặc mật khẩu." };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
