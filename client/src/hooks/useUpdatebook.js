import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBook as updateBookApi } from "../services/bookApi";
import { useParams, useNavigate } from "react-router-dom";

export default function useUpdatebook() {
  const queryClient = useQueryClient();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { mutate: updateBook, isLoading } = useMutation({
    mutationFn: (body) => updateBookApi({ bookId, body }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["books", "borrowed"]);
      toast.success(data.message);
      navigate(-1);
    },
    onError: (err) => {
      console.error("ERROR:", err);
      toast.error(err.message);
    },
  });

  return { updateBook, updateBookIsLoading: isLoading };
}
