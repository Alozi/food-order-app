export default function Modal({
  title,
  children,
  buttonLabel,
  modalRef,
  closeCartModal,
  handleOutsideClick,
}) {
  return (
    <dialog className="modal" ref={modalRef} onClick={handleOutsideClick}>
      <h2>{title}</h2>
      {children}
      <div className="modal-actions">
        <button className="text-button" onClick={closeCartModal}>
          Close
        </button>
        <button className="button">{buttonLabel}</button>
      </div>
    </dialog>
  );
}
