import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addBook as addBookApi } from "../services/bookApi";

export default function useAddBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addBook, isLoading } = useMutation({
    mutationFn: (body) => addBookApi(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast.success(data.message);
      navigate("/all-books");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    addBook,
    isLoading,
  };
}
