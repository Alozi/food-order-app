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
        <button className="text-button" onClick={closeModal}>
          Close
        </button>
        <button className="button" onClick={nextStepButton} disabled={nextStepButton == null ? true : false}>
          {buttonLabel}
        </button>
      </div>
    </dialog>
  );
}
