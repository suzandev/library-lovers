import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import useBorrowedBook from "../hooks/useBorrowedBook";

export default function BorrowedBooks() {
  const { books, isLoading, isError, error } = useBorrowedBook();
  return (
    <section>
      <div className="my-6">
        <div className="flex items-center justify-between">
          <SectionHeading
            titleSmall="BORROWED BOOKS"
            titleBlue="Your borrowed books from"
            titleGreen="Our best collections"
          />
        </div>
        {isLoading ? (
          <div>Loading</div>
        ) : isError ? (
          <div>{error.message}</div>
        ) : books?.length > 0 ? (
          <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book.book} type="book" />
            ))}
          </div>
        ) : (
          <div>No books</div>
        )}
        <div className="flex justify-end">
          <Pagination />
        </div>
      </div>
    </section>
  );
}
