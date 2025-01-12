import { RegisterOptions, useFormContext } from "react-hook-form";
import "./textfield.styles.css";

interface TextFieldProps {
  type?: string;
  name: string;
  id: string;
  className?: string;
  disabled?: boolean;
  validationRules?: RegisterOptions;
}

const TextField = ({
  type = "text",
  className,
  id,
  name,
  validationRules,
  disabled = false,
}: TextFieldProps) => {
  const { register } = useFormContext();

  return (
    <input
      className={`text-field ${className ?? ""}`}
      type={type}
      disabled={disabled}
      id={id}
      {...register(name, validationRules)}
    />
  );
};

export default TextField;
