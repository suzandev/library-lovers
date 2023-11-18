import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/bookApi";
import { useParams } from "react-router-dom";
export default function useGetBooks() {
  const { category } = useParams();

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", category],
    queryFn: () => getBooks({ category }),
  });

  return {
    books,
    isLoading,
    isError,
    error,
  };
}
