import { useContext } from "react";

import Image from "../assets/logo.jpg";
import Button from "../components/common/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const totalCartItem = cartContext.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressContext.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={Image} alt="Food order logo" />
        <h1>Food Order App 💪</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart}>Cart ({totalCartItem})</Button>
      </nav>
    </header>
  );
}
