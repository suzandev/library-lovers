import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { borrowBook as borrowBookApi } from "../services/bookApi";
import { useParams } from "react-router-dom";
export default function useBorrowBook() {
  const queryClient = useQueryClient();
  const { bookId } = useParams();

  const { mutate: borrowBook, isLoading } = useMutation({
    mutationFn: (body) => borrowBookApi({ ...body, bookId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["books", "borrowed", "book"]);
      toast.success(data.message);
    },
    onError: (err) => {
      console.error("ERROR:", err);
      toast.error(err.message);
    },
  });
  return { borrowBook, isLoading };
}
