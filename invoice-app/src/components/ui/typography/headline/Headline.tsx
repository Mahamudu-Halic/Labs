import { ReactNode, HTMLAttributes } from "react";
import "./headline.styles.css";
interface HeadlineProps extends HTMLAttributes<HTMLHeadElement> {
  children: ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Headline = ({ children, variant, className }: HeadlineProps) => {
  const combinedClassName = `headline ${variant} ${className}`.trim();
  const Tag = variant;
  return <Tag className={combinedClassName}>{children}</Tag>;
};

export default Headline;
