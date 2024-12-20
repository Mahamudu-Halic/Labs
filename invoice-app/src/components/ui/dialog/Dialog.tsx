import styles from "./dialog.module.css";

interface DialogProps {
  showBackground?: boolean;
  onClose?: () => void;
}

const Dialog = ({ showBackground = false, onClose }: DialogProps) => {
  return (
    <div
      className={`${styles.dialog} ${showBackground && styles.overlay}`}
      onClick={onClose}
    ></div>
  );
};

export default Dialog;
