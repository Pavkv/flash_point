import Modal from "../Modal/Modal.jsx";

export default function DeleteConfirmationModal({
  onClose,
  isOpen,
  onClick,
  isLoading,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} name={"delete-confirmation"}>
      <div className="notification-modal">
        <p className="modal__text notification-modal__text">
          Are you sure you want to remove this article from you saves?
        </p>
        <button
          className="modal__text notification-modal__button notification-modal__button_confirm"
          type="button"
          onClick={onClick}
        >
          {isLoading ? "Deleting..." : "Yes, delete article"}
        </button>
        <button
          className="modal__text notification-modal__button notification-modal__button_cancel"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
