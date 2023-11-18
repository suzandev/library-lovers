import { useQuery } from "@tanstack/react-query";
import { getBorrowedBooks } from "../services/bookApi";

export default function useBorrowedBook() {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: getBorrowedBooks,
  });

  return { books: books?.books || [], isLoading, isError, error };
}
