import "./landing.styles.css";
import {useNavigate} from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    const goToForm = () => {
        navigate("/auth-form");
    };

    return (
        <div className={"landing"}>

            <div className="landing-hero">

                <div className="landing-hero__content">
                    <h1>Lorem <span>Gaming,</span></h1>
                    <p>
                        One of the popular online gaming service providers in US has recently launched a new
                        online gaming experience that customers can subscribe to for access to various features
                    </p>
                    <button className={"landing__button"} onClick={goToForm}>
                        Get Started
                    </button>
                </div>
                <div className="landing-hero__image">

                    <img
                        src="/assets/images/fill-form.svg"
                        alt={"info"}
                    />
                </div>
            </div>

            <section>
                <h2>What to expert from the form 👇</h2>
                <div className="landing__image-container">
                    <img
                        className={"landing__image"}
                        src="/assets/images/info.png"
                        alt={"info"}
                    />
                    <img
                        className={"landing__image"}
                        src="/assets/images/plan.png"
                        alt={"plan"}
                    />
                    <img
                        className={"landing__image"}
                        src="/assets/images/add-ons.png"
                        alt={"add-ons"}
                    />
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
