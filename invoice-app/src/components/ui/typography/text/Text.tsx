import { ReactNode, HTMLAttributes } from "react";
import styles from "./text.module.css";
interface TextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLLabelElement> {
  children?: ReactNode;
  size?: "sm" | "md";
  type?: "p" | "span" | "label";
  bold?: boolean;
}

const Text = ({
  children,
  size = "md",
  type = "p",
  className,
  bold = false,
  ...props
}: TextProps) => {
  const Tag = type;
  const combinedClassName =
    `${styles.text} ${styles[size]} ${className ?? ""} ${bold && styles.bold}`.trim();
  return (
    <Tag className={combinedClassName} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
