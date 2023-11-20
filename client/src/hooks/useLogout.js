import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/authApi";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: (data) => {
      queryClient.removeQueries(["user"]);

      toast.success(data.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    logout,
    isLoading,
  };
}
