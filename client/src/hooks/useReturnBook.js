import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { returnBook as returnBookApi } from "../services/bookApi";
import { useState } from "react";

export default function useReturnBook() {
  const queryClient = useQueryClient();
  const [reviewed, setReviewed] = useState(true);
  const {
    mutate: returnBook,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (body) => returnBookApi(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["books", "borrowed", "book"]);
      setReviewed(data?.reviewed);
      if (data.message) toast.success(data.message);
    },
    onError: (err) => {
      console.error("ERROR:", err);
      toast.error(err.message);
    },
  });

  return { returnBook, isLoading, isError, reviewed };
}
