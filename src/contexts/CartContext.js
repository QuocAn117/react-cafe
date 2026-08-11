import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cafe_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cafe_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (menuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === menuItem.id);
      if (existing) {
        return prev.map((it) =>
          it.id === menuItem.id
            ? { ...it, quantity: it.quantity + quantity }
            : it
        );
      }
      return [
        ...prev,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity } : it))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
