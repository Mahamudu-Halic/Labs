import Container from "../ui/container/Container.tsx";
import "./sidebar.styles.css"
import Icon from "../ui/icon/Icon.tsx";
import logo from "../../assets/images/logo.svg"
import ToggleTheme from "./toggle-theme/ToggleTheme.tsx";
import Avatar from "../ui/avatar/Avatar.tsx";
import profileImage from "../../assets/images/image-avatar.jpg"

const Sidebar = () => {

    return (
        <Container container={"section"} className={"sidebar"}>
            <Container container={"div"} className={"sidebar__logo-container"}>
                <Container container={"div"} className={"sidebar__logo-container-bottom"}></Container>
                <Icon icon={logo} description={"logo"}/>
            </Container>

            <Container container={"div"} className={"sidebar__bottom-container"}>
                <ToggleTheme/>
                <hr/>
                <Avatar image={profileImage} radius={"rounded-full"} className={"profile"}/>
            </Container>

        </Container>
    )
}

export default Sidebar;