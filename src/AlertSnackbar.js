import React, { useEffect } from "react";
import styles from "./styles.scss";

export const AlertSnackbar = ({ isOpen = false, onClose, message, status }) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [isOpen]);

  return isOpen && message ? (
    <div
      className={styles.snackbar}
      style={{ backgroundColor: status === "success" ? "#1cd40be1" : "red" }}
    >
      {message}
    </div>
  ) : null;
};
