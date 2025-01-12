import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Invoices from "./components/invoices/Invoices.tsx";
import { Link, Route, Routes } from "react-router-dom";
import NotFound from "./components/not-found/NotFound.tsx";
import Headline from "./components/ui/typography/headline/Headline.tsx";
import Text from "./components/ui/typography/text/Text.tsx";
import ViewInvoice from "./components/view-invoice/ViewInvoice.tsx";
import { useEffect, useState } from "react";
import { fetchInvoices } from "./features/invoice/invoice.slice.ts";
import { useAppDispatch } from "./hooks/useRedux.ts";
import { Toaster } from "sonner";
import { useLoginMutation } from "./api/invoice.api.ts";
import { setToken } from "./features/auth/auth.slice.ts";
import ProjectedRoutes from "./components/auth/ProjectedRoutes.tsx";
import LandingPage from "./components/landing/LandingPage.tsx";
import LoginAuth from "./components/auth/Login.auth.tsx";
import PublicAuth from "./components/auth/PublicAuth.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleLogin = async () => {
    const data = await login({
      username: "halic.mahamudu@amalitech.com ",
      password: "G@5z!Q8x&7P$",
    });
    console.log(data);
    return data;
  };

  // useEffect(() => {
  //   if (!isLoading) {
  //     handleLogin().then((data) => {
  //       dispatch(
  //         setToken({
  //           ...data.data,
  //         }),
  //       );
  //     });
  //   }
  // }, []);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>error</div>;

  return (
    <div className={"app"}>
      {/*<p>hello</p>*/}
      <Toaster position={"top-right"} richColors />
      <Routes>
        {/*public routes*/}
        <Route path="/" element={<LandingPage />} />
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
              <Link to={"/"}>Home</Link>
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
