import { ReactNode, HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "danger";
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
}
const Button = ({
  children,
  radius = "rounded",
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const combinedClassName = `button ${variant} ${radius} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
