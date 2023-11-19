import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/authApi";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login Successful");
      navigate("/");
    },

    onError: (err) => {
      console.error("ERROR:", err);
      toast.error(err.message);
    },
  });

  return {
    login,
    isLoading,
  };
}
