import { ReactNode, HTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "tertiary" | "danger";
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  disabled?: boolean;
}

const Button = ({
  children,
  radius = "rounded",
  variant = "default",
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  const combinedClassName =
    `${styles.button} ${styles[variant]} ${styles[radius]} ${className ?? ""}`.trim();

  return (
    <button className={combinedClassName} {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
