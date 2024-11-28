import "./icon.styles.css"

interface IconComponentProps{
    icon: string;
    customClassName: string;
}

/**
 * A simple component that renders a div with a class name of "icon" and
 * the given customClassName. It contains an img tag with the src set to the
 * given icon.
 *
 * @param {IconComponentProps} props
 * @prop {string} icon - The url of the image to be used as the icon
 * @prop {string} customClassName - An additional class name to be added to the
 * div
 *
 * @returns A JSX element representing the IconComponent
 */
const IconComponent = ({icon, customClassName}: IconComponentProps) => {
    return (
        <div className={`icon ${customClassName}`}>
            <img src={icon} alt={"icon"}/>
        </div>
    )
}

export default IconComponent;