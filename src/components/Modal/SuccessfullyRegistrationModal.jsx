import Modal from "../Modal/Modal.jsx";

export default function SuccessfullyRegistrationModal({
  onClose,
  isOpen,
  onClick,
  isLoading,
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} name={"successfully-registration"}>
      <div className="notification-modal">
        <p className="modal__text notification-modal__text">
          Registration was successful! You can now log in to your account.
        </p>
        <button
          className="modal__text notification-modal__button notification-modal__button_confirm"
          type="button"
          onClick={onClick}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </Modal>
  );
}
