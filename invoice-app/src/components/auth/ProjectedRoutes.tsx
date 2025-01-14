import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import { Navigate, useLocation } from "react-router-dom";

import Dashboard from "../Dashboard.tsx";

const ProjectedRoutes = () => {
  const token = useAppSelector(selectToken);
  const location = useLocation();

  return token ? (
    <Dashboard />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default ProjectedRoutes;
