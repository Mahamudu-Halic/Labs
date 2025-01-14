import "./App.css";
import Invoices from "./components/invoices/Invoices.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./components/not-found/NotFound.tsx";
import Headline from "./components/ui/typography/headline/Headline.tsx";
import Text from "./components/ui/typography/text/Text.tsx";
import ViewInvoice from "./components/view-invoice/ViewInvoice.tsx";
import { Toaster } from "sonner";
import ProjectedRoutes from "./components/auth/ProjectedRoutes.tsx";
import LandingPage from "./components/landing/LandingPage.tsx";
import LoginAuth from "./components/auth/Login.auth.tsx";
import PublicAuth from "./components/auth/PublicAuth.tsx";
import Button from "./components/ui/button/button.tsx";
import Error from "./components/error/Error.tsx";

function App() {
  const navigate = useNavigate();
  return (
    <div className={"app"}>
      <Toaster position={"top-right"} richColors />
      <Routes>
        {/*public routes*/}
        <Route path="/" element={<LandingPage />} />
        <Route
          path={"/unauthorized"}
          element={
            <Error
              data={"You are not authorized to view this page"}
              url={"/invoices"}
              goTo={"Dashboard"}
            />
          }
        />
        <Route element={<PublicAuth />}>
          <Route path={"/auth/login"} element={<LoginAuth />} />
        </Route>
        <Route
          path="*"
          element={
            <NotFound>
              <Headline variant={"h3"}>Page not found 🙁</Headline>
              <Text>
                Go to dashboard by clicking the <br />
                <strong>Home</strong> button👇
              </Text>
              <Button variant={"secondary"} onClick={() => navigate("/")}>
                Home
              </Button>
            </NotFound>
          }
        />

        {/*private routes*/}
        <Route element={<ProjectedRoutes />}>
          <Route path={"/invoices"} element={<Invoices />} />
          <Route path="/invoices/:id" element={<ViewInvoice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
