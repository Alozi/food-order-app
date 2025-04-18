import { useContext } from "react";

import Image from "../assets/logo.jpg";
import Button from "../components/common/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function Header({ openCartModal }) {
  const cartContext = useContext(CartContext);

  const totalCartItem = cartContext.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  console.log();
  return (
    <header id="main-header">
      <div id="title">
        <img src={Image} alt="Food order logo" />
        <h1>Food Order App 💪</h1>
      </div>
      <nav>
        <Button onClick={openCartModal}>
          Cart ({totalCartItem})
        </Button>
      </nav>
    </header>
  );
}
