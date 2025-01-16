import "./App.css";
import Invoices from "./components/invoices/Invoices.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error from "./components/error/Error.tsx";
import Headline from "./components/ui/typography/headline/Headline.tsx";
import Text from "./components/ui/typography/text/Text.tsx";
import ViewInvoice from "./components/view-invoice/ViewInvoice.tsx";
import { Toaster } from "sonner";
import ProjectedRoutes from "./components/auth/ProjectedRoutes.tsx";
import LandingPage from "./components/landing/LandingPage.tsx";
import LoginAuth from "./components/auth/Login.auth.tsx";
import PublicAuth from "./components/auth/PublicAuth.tsx";
import Button from "./components/ui/button/button.tsx";
import Unauthorized from "./components/auth/Unauthorized.tsx";
import Forbidden from "./components/auth/Forbidden.tsx";
import { useAppSelector } from "./hooks/useRedux.ts";
import { themeSelector } from "./features/theme/theme.slice.ts";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const { theme } = useAppSelector(themeSelector);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className={"app"}>
      <Toaster position={"top-right"} richColors />
      <Routes>
        {/*public routes*/}
        <Route path="/" element={<LandingPage />} />
        <Route path={"/unauthorized"} element={<Unauthorized />} />
        <Route path={"/forbidden"} element={<Forbidden />} />
        <Route element={<PublicAuth />}>
          <Route path={"/auth/login"} element={<LoginAuth />} />
        </Route>
        <Route
          path="*"
          element={
            <Error>
              <Headline variant={"h3"}>Page not found 🙁</Headline>
              <Text>
                Go to dashboard by clicking the <br />
                <strong>Home</strong> button👇
              </Text>
              <Button
                variant={"secondary"}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </Error>
          }
        />

        {/*private routes*/}
        <Route element={<ProjectedRoutes />}>
          <Route path={"/dashboard"} element={<Invoices />} />
          <Route path="/dashboard/:id" element={<ViewInvoice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
