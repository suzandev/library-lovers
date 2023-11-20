import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { relatedBooks as relatedBooksApi } from "../services/bookApi";

export default function useReletedbooks() {
  const { bookId } = useParams();
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["relatedBooks", bookId],
    queryFn: () => relatedBooksApi(bookId),
  });

  return { books, isLoading, isError, error };
}
