import Button from "../ui/button/button.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import "./landingpage.styles.css";
import Headline from "../ui/typography/headline/Headline.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import Text from "../ui/typography/text/Text.tsx";
import landingImage from "../../assets/images/landing-image.png";
import logo from "../../assets/images/logo.svg";
import Icon from "../ui/icon/Icon.tsx";

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
              <Button variant={"primary"} onClick={() => navigate("/invoices")}>
                Get started
              </Button>
            ) : (
              <Button
                variant={"tertiary"}
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
            )}
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
          <Button variant={"primary"} onClick={() => navigate("/invoices")}>
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
            Create and edit invoices
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={listIcon} description="list" />*/}
            Customize invoice templates
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={chartIcon} description="chart" />*/}
            Track your expenses and income
          </div>
          <div className={"feature"}>
            {/*<Icon size={"xxl"} icon={lockIcon} description="lock" />*/}
            Secure your data
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
