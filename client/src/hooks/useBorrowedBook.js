import { useQuery } from "@tanstack/react-query";
import { getBorrowedBooks } from "../services/bookApi";
import { useSearchParams } from "react-router-dom";

export default function useBorrowedBook() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: () => getBorrowedBooks(page),
  });

  return {
    books: books?.books || [],
    isLoading,
    isError,
    error,
    page: books?.page,
    pages: books?.pages,
  };
}
