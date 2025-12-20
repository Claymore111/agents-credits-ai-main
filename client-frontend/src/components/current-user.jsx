import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../features/user-slice";

export default function CurrentUser({ children }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);
  useEffect(() => {
    try {
      dispatch(getCurrentUser());
    } catch (error) {}
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  return children;
}
