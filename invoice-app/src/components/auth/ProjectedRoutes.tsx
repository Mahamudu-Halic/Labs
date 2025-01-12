import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectToken } from "../../features/auth/auth.slice.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";

const ProjectedRoutes = () => {
  const token = useAppSelector(selectToken);
  const location = useLocation();
  return token ? (
    <>
      <Sidebar />
      <div className={"content"}>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default ProjectedRoutes;
