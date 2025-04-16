import { createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export function CartContextProvider({ children }) {
  return <CartContext>{children}</CartContext>;
}

export default CartContext;