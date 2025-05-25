import { useContext, useEffect } from "react";
import { MobileContext } from "../../context/MobileContext.js";

export default function Modal({ isOpen, onClose, children, name }) {
  const { isMobile } = useContext(MobileContext);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_visible" : ""}`}
    >
      <div
        className={`modal__overlay ${isMobile ? "modal__overlay_hidden" : ""}`}
        onClick={onClose}
      >
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="modal__close-btn"
            onClick={onClose}
            hidden={isMobile}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
