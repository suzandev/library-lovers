import AvailableBooksToggler from "../components/AvailableBooksToggler";

import BooksContainer from "../components/BooksContainer";
import ErrorAlert from "../components/ErrorAlert";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import WarningAlert from "../components/WarningAlert";
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
          <div>Loading...</div>
        ) : isError ? (
          <ErrorAlert message={error.message} />
        ) : books?.length > 0 ? (
          <>
            <BooksContainer books={books} />

            {pages > 1 && (
              <div className="flex justify-end">
                <Pagination pages={pages} />
              </div>
            )}
          </>
        ) : (
          <WarningAlert message={`${books.length} book found`} />
        )}
      </div>
    </section>
  );
}
