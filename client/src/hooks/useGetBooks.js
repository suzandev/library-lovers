import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/bookApi";
import { useParams, useSearchParams } from "react-router-dom";



export default function useGetBooks() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const abo = searchParams.get("abo");
  const page = searchParams.get("page");

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", category, abo, page],
    queryFn: () => getBooks({ category, abo }),
  });

  return {
    books: books?.books || [],
    total: books?.total,
    pages: books?.pages,
    isLoading,
    isError,
    error,
  };
}
