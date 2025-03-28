import { createPortal } from "react-dom";

import Modal from "./Modal.jsx";

export default function Checkout({
  modalRef,
  closeModal,
  handleOutsideClick,
  total,
}) {
  return createPortal(
    <Modal
      title="Checkout"
      buttonLabel="Submit Order"
      modalRef={modalRef}
      closeModal={closeModal}
      handleOutsideClick={handleOutsideClick}
    >
      <div>Total Amount: ${total}</div>
    </Modal>,
    document.getElementById("modal")
  );
}
