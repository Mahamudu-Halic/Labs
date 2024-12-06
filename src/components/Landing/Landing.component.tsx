import { useEffect, useState } from "react";
import "./landing.styles.css";
import { useNavigate } from "react-router-dom";

function LaningPage() {
  const navigate = useNavigate();
  const [inProgress, setInProgress] = useState(() =>
    JSON.parse(localStorage.getItem("inProgress") || "false")
  );

  const goToForm = () => {
    localStorage.removeItem("complete");
    localStorage.setItem("inProgress", "true");
    navigate("/auth-form");
  };

  useEffect(() => {
    inProgress && navigate("/auth-form");
  }, []);
  return (
    <div className={"landing"}>
      <button className={"landing__button"} onClick={goToForm}>
        Get Started
      </button>

      <h1>What to expert from the form 👇</h1>
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
    </div>
  );
}

export default LaningPage;
