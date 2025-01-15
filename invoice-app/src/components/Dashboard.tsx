import Sidebar from "./sidebar/Sidebar.tsx";
import { Navigate, Outlet } from "react-router-dom";
import Error from "./error/Error.tsx";
import { useGetInvoicesQuery } from "../api/invoice.api.ts";
import { useEffect } from "react";
import {
  filterInvoices,
  selectInvoices,
  selectStatusFilter,
  setInvoices,
} from "../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux.ts";
import Button from "./ui/button/button.tsx";
import Loader from "./ui/loader/Loader.tsx";

const Dashboard = () => {
  const { isLoading, isError, error, data, refetch } = useGetInvoicesQuery("");
  const statusFilter = useAppSelector(selectStatusFilter);
  const invoices = useAppSelector(selectInvoices);

  // Initialize invoices and filter on status change using Redux slice.
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!data) {
      return;
    }
    dispatch(setInvoices(data));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(filterInvoices());
  }, [dispatch, invoices, statusFilter]);

  if (isError) {
    if (
      error &&
      "originalStatus" in error &&
      typeof error.originalStatus === "number"
    ) {
      if (error.originalStatus === 401) {
        return <Navigate to={"/unauthorized"} />;
      }
    }

    if (error && "status" in error && error.status === "FETCH_ERROR") {
      return (
        <Error error={"Check internet connection 🙁"}>
          <Button onClick={() => refetch()}>Reload page</Button>
        </Error>
      );
    }

    return (
      <Error>
        <Button onClick={() => refetch()}>Reload page</Button>
      </Error>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <div className={"content"}>
        <Outlet />
      </div>
      {/*<Loader />*/}
    </>
  );
};
export default Dashboard;
