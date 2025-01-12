import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import { Navigate, Outlet } from "react-router-dom";

const PublicAuth = () => {
  const token = useAppSelector(selectToken);

  return token ? <Navigate to={"/invoices"} /> : <Outlet />;
};
export default PublicAuth;
