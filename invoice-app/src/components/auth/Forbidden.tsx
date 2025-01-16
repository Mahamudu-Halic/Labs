import Error from "../error/Error.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Button from "../ui/button/button.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Forbidden = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <Error>
      <Headline variant={"h3"}>Session has expired</Headline>

      <Button variant={"secondary"} onClick={() => navigate("/auth/login")}>
        Login
      </Button>
    </Error>
  );
};

export default Forbidden;
