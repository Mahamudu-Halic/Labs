import Button from "../ui/button/button.tsx";
import { useNavigate } from "react-router-dom";
import "./landingpage.styles.css";
import Headline from "../ui/typography/headline/Headline.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import Text from "../ui/typography/text/Text.tsx";
import landingImage from "../../assets/images/landing-image.png";
import logo from "../../assets/images/logo.svg";
import Icon from "../ui/icon/Icon.tsx";
import ToggleTheme from "../sidebar/toggle-theme/ToggleTheme.tsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  return (
    <div className={"landing-page"}>
      <header>
        <nav>
          <div className="product">
            <Icon
              icon={logo}
              description={"logo"}
              radius={"rounded-full"}
              size={"md"}
            />
            <Headline variant={"h3"}>Invoice</Headline>
          </div>

          <a href={"#features"}>Features</a>

          <div>
            {token ? (
              <Button
                variant={"primary"}
                onClick={() => navigate("/dashboard")}
              >
                Get started
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                onClick={() => navigate("/auth/login")}
                className={"login-button"}
              >
                Login
              </Button>
            )}
            <ToggleTheme />
          </div>
        </nav>

        <main>
          <Headline variant={"h1"}>Simplify invoice payments.</Headline>
          <Headline variant={"h1"}>Amplify cash flow.</Headline>

          <div>
            <Text size={"sm"}>
              Invoices are a great way to keep track of expenses and income.
              With our intuitive interface, you can
            </Text>
            <Text size={"sm"}>
              create, edit, and delete invoices in one place.
            </Text>
          </div>
          <Button variant={"primary"} onClick={() => navigate("/dashboard")}>
            Get Started
          </Button>
          <Icon size={"xxxl"} icon={landingImage} description="money" />
        </main>
      </header>

      <section className={"features"} id={"features"}>
        <Headline variant={"h2"}>Features</Headline>
        <div className={"feature-list"}>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={checkIcon} description="check" />*/}
            icon
            <Text>Create invoice</Text>
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={listIcon} description="list" />*/}
            icon
            <Text>Edit invoice</Text>
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={chartIcon} description="chart" />*/}
            icon
            <Text>Delete invoice</Text>
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={lockIcon} description="lock" />*/}
            icon
            <Text>Secure your data</Text>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
