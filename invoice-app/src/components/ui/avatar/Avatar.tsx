import Button from "../button/button.tsx";
import Icon from "../icon/Icon.tsx";
import {HTMLAttributes} from "react";
import styles from "./avatar.module.css"

interface AvatarProps extends HTMLAttributes<HTMLButtonElement> {
    image: string;
    radius?: "rounded" | "rounded-sm" | "rounded-md" | "rounded-lg" | "rounded-full"
}

const Avatar = ({image, radius = "rounded", className}: AvatarProps) => {
    const combinedClassName = `${styles.avatar} ${className ?? ""}`.trim();
    return (
        <Button radius={radius} className={combinedClassName}>
            <Icon icon={image} description={"profile"} radius={radius}/>
        </Button>
    )
}

export default Avatar