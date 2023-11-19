import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { postReview as postReviewApi } from "../services/reviewApi";

export default function usePostReview() {
  const queryClient = useQueryClient();
  const { mutate: postReview, isLoading } = useMutation({
    mutationFn: (body) => postReviewApi(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["books", "borrowed", "book"]);
      toast.success(data.message);
    },
    onError: (err) => {
      console.error("ERROR:", err);
      toast.error(err.message);
    },
  });

  return { postReview, isLoading };
}
