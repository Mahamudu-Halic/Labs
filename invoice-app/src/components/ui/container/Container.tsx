import {HTMLAttributes, ReactNode} from "react";
import styles from "./container.module.css"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    container: "div" | "section";
}

const Container = ({children, container, className}: ContainerProps) => {
    const Tag = container;
    const combinedClassName = `${styles.container} ${className ?? ""}`.trim();

    return <Tag className={combinedClassName}>{children}</Tag>;
}

export default Container;