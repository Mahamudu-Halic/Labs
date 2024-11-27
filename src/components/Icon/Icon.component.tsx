import "./icon.styles.css"

const IconComponent = ({icon, customClassName}: { icon?: string, customClassName?: string }) => {
    return (
        <div className={`icon ${customClassName}`}>
            <img src={icon} alt={"icon"}/>
        </div>
    )
}

export default IconComponent;