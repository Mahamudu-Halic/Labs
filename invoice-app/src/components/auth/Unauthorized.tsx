import Error from "../error/Error.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Button from "../ui/button/button.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const token = useAppSelector(selectToken);
  const navigate = useNavigate();
  return (
    <Error>
      <Headline variant={"h3"}>
        You are not authorized to view this page
      </Headline>

      <Button
        variant={"secondary"}
        onClick={() => navigate(token ? "/dashboard" : "/auth/login")}
      >
        {token ? "Go to Dashboard" : "Login"}
      </Button>
    </Error>
  );
};

export default Unauthorized;
