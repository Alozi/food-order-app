import { createPortal } from "react-dom";

import Modal from "./Modal.jsx";

export default function Cart({ data, modalRef, closeCartModal, handleOutsideClick }) {
  return createPortal(
    <Modal title="Your Cart" buttonLabel="Go to Checkout" modalRef={modalRef} closeCartModal={closeCartModal} handleOutsideClick={handleOutsideClick}>
      <div className="cart">
        {data.length == 0 && <p>Your cart is empty.</p>}
        {data.length > 0 && (
          <ul>
            {data.map((item) => {
              return (
                <li key={item.id}>
                  {item.title} - {item.quantity} x ${item.price}
                </li>
              );
            })}
          </ul>
        )}

        <div className="cart-total">$1000</div>
      </div>
    </Modal>,
    document.getElementById("modal")
  );
}
