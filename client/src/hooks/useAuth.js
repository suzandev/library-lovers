import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";

export default function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.isAuthenticated || false;
  const librarian = user?.role === "librarian" || null;

  return {
    isAuthenticated,
    isLoading,
    librarian,
    user,
  };
}
