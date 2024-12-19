import styles from "./badge.module.css";
import Text from "../typography/text/Text.tsx";
interface BadgeProps {
  status: string;
}

const Badge = ({ status }: BadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[status]}`}>
      <span className={styles["badge__dot"]}></span>
      <Text>{status}</Text>
    </div>
  );
};

export default Badge;
