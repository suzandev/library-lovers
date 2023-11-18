import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/bookApi";
export default function useGetBooks() {
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return {
    books,
    isLoading,
    isError,
    error,
  };
}
