import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";

export default function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });



  return {
    isAuthenticated: user?.isAuthenticated,
    isLoading,
    librarian: user?.role === "librarian",
    user,
  };
}
