import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you wrapper">
      <img src="/assets/images/icon-thank-you.svg" alt="" />
      <h2>Thank You</h2>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>

      <button onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
};

export default ThankYou;
