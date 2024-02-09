import React, { useState } from "react";
import styles from "./styles.scss";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleModalOpen}>Open modal window</button>
      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button onClick={handleModalClose} className={styles.closeButton}>
              X
            </button>
            <p>Modal window</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
