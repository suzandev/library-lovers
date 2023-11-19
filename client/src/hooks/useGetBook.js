import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBook as getBookApi } from "../services/bookApi";

export default function useGetBook() {
  const { bookId } = useParams();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBookApi(bookId),
  });

  return {
    book: book?.book,
    isLoading,
    isError,
    error,
  };
}
