import BorrowCard from "../components/BorrowCard";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import WarningAlert from "../components/WarningAlert";
import useBorrowedBook from "../hooks/useBorrowedBook";

export default function BorrowedBooks() {
  const { books, isLoading, isError, error, pages } = useBorrowedBook();
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
              <BorrowCard key={book._id} bookInfo={book} type="book" />
            ))}
          </div>
        ) : (
          <WarningAlert message={`${books.length} book found`} />
        )}
        {pages > 1 && (
          <div className="flex justify-end">
            <Pagination pages={pages} />
          </div>
        )}
      </div>
    </section>
  );
}
