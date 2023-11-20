import useReletedbooks from "../hooks/useReletedbooks";
import BookCard from "./BookCard";

export default function RelatedBooks() {
  const { books, isLoading, isError, error } = useReletedbooks();
  return (
    <div className="my-6">
      <h1 className="my-4 text-3xl text-brand-text max-sm:text-lg">
        Related Books
      </h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {!isLoading && !isError && books.length > 0 && (
        <div className="grid gap-4 max-sm:grid-cols-2 sm:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} type="book" />
          ))}
        </div>
      )}
    </div>
  );
}
