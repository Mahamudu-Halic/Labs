import { ReactNode, HTMLAttributes } from "react";
import "./text.styles.css";
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Text = ({ children, size = "md", className }: TextProps) => {
  const combinedClassName = `text ${size} ${className}`.trim();
  return <p className={combinedClassName}>{children}</p>;
};

export default Text;
