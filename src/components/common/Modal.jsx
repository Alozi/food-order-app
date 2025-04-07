import Button from "./Button";

export default function Modal({
  title,
  children,
  buttonLabel,
  modalRef,
  closeModal,
  handleOutsideClick,
  nextStepButton,
}) {
  return (
    <dialog className="modal" ref={modalRef} onClick={handleOutsideClick}>
      <h2>{title}</h2>
      {children}
      <div className="modal-actions">
        <Button textOnly={true} onClick={closeModal}>
          Close
        </Button>
        <Button onClick={nextStepButton} disabled={nextStepButton == null ? true : false}>
          {buttonLabel}
        </Button>
      </div>
    </dialog>
  );
}
