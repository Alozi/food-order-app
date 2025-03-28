import { createPortal } from "react-dom";

import Modal from "./Modal.jsx";

export default function Cart({
  data,
  modalRef,
  closeCartModal,
  handleOutsideClick,
  total,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return createPortal(
    <Modal
      title="Your Cart"
      buttonLabel="Go to Checkout"
      modalRef={modalRef}
      closeCartModal={closeCartModal}
      handleOutsideClick={handleOutsideClick}
    >
      <div className="cart">
        {data.length == 0 && <p>Your cart is empty.</p>}
        {data.length > 0 && (
          <ul>
            {data.map((item) => {
              return (
                <li key={item.id} className="cart-item">
                  <p>
                    {item.title} - {item.quantity} x ${item.price}
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

        <div className="cart-total">${total}</div>
      </div>
    </Modal>,
    document.getElementById("modal")
  );
}
