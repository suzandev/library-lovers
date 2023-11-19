import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";

export default function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.isAuthenticated;
  const librarian = user?.role === "librarian";

  return {
    isAuthenticated,
    isLoading,
    librarian,
    user,
  };
}
