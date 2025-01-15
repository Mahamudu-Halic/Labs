import NotFound from "../not-found/NotFound.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button/button.tsx";
import { ReactNode } from "react";

interface ErrorProps {
  data?: string;
  error?: string;
  message?: string;
  goTo?: string;
  url?: string;
  children?: ReactNode;
}

const Error = ({ data, error, message, goTo, url, children }: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <NotFound>
      <Headline variant={"h3"}>
        {data ?? error ?? "An unexpected error occurred 🙁"}
      </Headline>
      <Text>{message ?? ""}</Text>
      {goTo && (
        <Button variant={"secondary"} onClick={() => navigate(url ?? "/")}>
          {goTo}
        </Button>
      )}
      {children}
    </NotFound>
  );
};

export default Error;
