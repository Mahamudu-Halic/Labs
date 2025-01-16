import { toast } from "sonner";
import { Navigate } from "react-router-dom";

const catchError = (err: {
  originalStatus?: number;
  data?: string;
  status?: string | number;
  error?: string;
}) => {
  toast.dismiss();
  if (err?.originalStatus) {
    if (err?.originalStatus === 401) {
      return <Navigate to={"/unauthorized"} />;
    } else if (err?.originalStatus === 403) {
      return <Navigate to={"/forbidden"} />;
    } else if (err?.originalStatus === 404) {
      return toast.error("Invoice not found");
    } else {
      return toast.error(err?.data || "An unexpected error occurred");
    }
  }

  if (err?.status) {
    if (err?.status === "FETCH_ERROR") {
      return toast.error("Check internet connection");
    } else {
      return toast.error(err?.error || "An unexpected error occurred");
    }
  }
};

export default catchError;
