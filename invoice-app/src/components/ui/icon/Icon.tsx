import styles from "./icon.module.css"

interface IconProps {
    icon: string;
    description: string;
    radius?: "rounded" | "rounded-sm" | "rounded-md" | "rounded-lg" | "rounded-full";
    className?: string;

}

const Icon = ({icon, description, radius = "rounded", className}: IconProps) => {
    const combinedClassName = `${styles.icon} ${styles[radius]} ${className || ""}`.trim();

    return <img src={icon} alt={description} className={combinedClassName}/>;
}

export default Icon;