import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function IsAuthenticated({ children }) {
  const { isAuthenticated, isLoading } = useSelector((store) => store.user);

  if (isLoading) return null;
  return isAuthenticated ? children : <Navigate to="/login" />;
}
