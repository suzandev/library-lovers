import AvailableBooksToggler from "../components/AvailableBooksToggler";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import useGetBooks from "../hooks/useGetBooks";

export default function AllBooks() {
  const { books, isLoading, isError, error, pages } = useGetBooks();

  return (
    <section>
      <div className="my-6">
        <div className="flex flex-wrap items-center justify-between">
          <SectionHeading
            titleSmall="ALL BOOKS"
            titleBlue="Best books from"
            titleGreen="Our best collections"
          />
          <AvailableBooksToggler />
        </div>

        {isLoading ? (
          <div>Loading</div>
        ) : isError ? (
          <div>{error.message}</div>
        ) : books?.length > 0 ? (
          <>
            <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book._id} book={book} type="book" />
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-end">
                <Pagination pages={pages} />
              </div>
            )}
          </>
        ) : (
          <div>No books</div>
        )}
      </div>
    </section>
  );
}
