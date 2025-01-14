import Text from "../typography/text/Text.tsx";
import "./label.styles.css";

interface LabelProps {
  htmlFor: string;
  label: string | JSX.Element;
  error?: string;
  showError?: boolean;
  className?: string;
}

const Label = ({
  htmlFor,
  label,
  className,
  error,
  showError = false,
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label ${error ? "error" : ""} ${className ?? ""}`}
    >
      {label}
      {showError && (
        <Text size={"sm"} type={"span"}>
          {error ?? ""}
        </Text>
      )}
    </label>
  );
};

export default Label;
