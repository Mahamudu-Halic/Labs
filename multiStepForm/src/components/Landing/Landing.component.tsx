import "./landing.styles.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const goToForm = () => {
    navigate("/auth-form");
  };

  return (
    <div className={"landing"}>
      <div className="overlay"></div>
      <div className="content">
        <span>Welcome to</span>
        <h1 className="title">Lorem Gaming</h1>
        <p className="description">
          One of the popular online gaming service providers in US has recently
          launched a new online gaming experience that customers can subscribe
          to for access to various features
        </p>
        <button onClick={goToForm} className="button">
          Get started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;