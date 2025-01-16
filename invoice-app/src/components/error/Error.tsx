import errorImage from "../../assets/images/illustration-empty.svg";
import Icon from "../ui/icon/Icon.tsx";
import { ReactNode } from "react";
import styles from "./error.module.css";

interface NotFoundProps {
  children: ReactNode;
}

const Error = ({ children }: NotFoundProps) => {
  return (
    <div className={styles["error"]}>
      <Icon icon={errorImage} description={"not found"} size={"xxl"} />
      {children}
    </div>
  );
};

export default Error;
