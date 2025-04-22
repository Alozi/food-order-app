import { createPortal } from "react-dom";
import { useContext } from "react";

import Modal from "./common/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./common/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart({ onIncreaseQuantity, onDecreaseQuantity }) {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => (totalPrice += item.quantity * item.price),
    0
  );

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  return (
    <Modal open={userProgressContext.progress === "cart"} className="cart">
      <h2>Your Cart</h2>
      <div className="cart">
        {cartContext.items.length == 0 && <p>Your cart is empty.</p>}
        {cartContext.items.length > 0 && (
          <ul>
            {cartContext.items.map((item) => {
              return (
                <li key={item.id} className="cart-item">
                  <p>
                    {item.name} - {item.quantity} x ${item.price}
                  </p>

                  <div className="cart-item-actions">
                    <button onClick={() => onDecreaseQuantity(item.title)}>
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => onIncreaseQuantity(item.title)}>
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="cart-total">{currencyFormatter.format(cartTotal)}</div>

        <div className="modal-actions">
          <Button textOnly onClick={handleCloseCart}>Close</Button>
          <Button onClick={handleCloseCart}>Go to Checkout</Button>
        </div>
      </div>
    </Modal>
  );
}
