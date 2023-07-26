/* eslint-disable react/prop-types */
import styles from "../styles/modal.module.css";

function Modal({ title, message, onClose }) {
  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-title"]}>{title}</div>
        <div className={styles["modal-message"]}>{message}</div>
        <button className={styles["modal-close-button"]} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
