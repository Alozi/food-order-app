import { createPortal } from "react-dom";
import Modal from "./common/Modal";

export default function Success({ modalRef, closeModal, handleOutsideClick }) {
  return createPortal(
    <Modal
      title="Success"
      buttonLabel="Okay"
      modalRef={modalRef}
      closeModal={closeModal}
      handleOutsideClick={handleOutsideClick}
      nextStepButton={closeModal}
    >
      <p>You order was submitted successfully.</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
    </Modal>,
    document.getElementById("modal")
  );
}
