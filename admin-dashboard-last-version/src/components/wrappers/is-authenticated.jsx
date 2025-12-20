import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function IsAuthenticated({ children }) {
  const { isAuthenticated } = useSelector((store) => store.auth);

  return isAuthenticated ? children : <Navigate to="/login" />;
}
