import styles from "./select.module.css"

import {ReactNode, HTMLAttributes} from "react";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
    
}