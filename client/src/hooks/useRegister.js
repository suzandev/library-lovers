import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/authApi";

export default function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) =>
      registerApi(name, email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success(data.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    register,
    isLoading,
  };
}
