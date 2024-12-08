export const sumCartItemMrpPrice = (cartItems) => {
  return cartItems.reduce(
    (acc, item) => acc + item.mrpPrice * item.quantity,
    0
  );
};

export const sumCartItemSellingPrice = (cartItems) => {
  return cartItems.reduce(
    (acc, item) => acc + item.sellingPrice * item.quantity,
    0
  );
};
