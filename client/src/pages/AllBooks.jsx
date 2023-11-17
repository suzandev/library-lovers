import { useEffect } from "react";
import AvailableBooksToggler from "../components/AvailableBooksToggler";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import { sliderContent } from "../constant";
import { useAppContext } from "../hooks/useAppContext";

export default function AllBooks() {
  const { getBooks, books, getBooksIsLoading, getBooksIsError, error } =
    useAppContext();

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {getBooksIsLoading ? (
          <div>Loading</div>
        ) : getBooksIsError ? (
          <div>{error}</div>
        ) : books?.length > 0 ? (
          <>
            <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {sliderContent.map((category) => (
                <BookCard key={category.name} book={category} type="book" />
              ))}
            </div>

            <div className="flex justify-end">
              <Pagination />
            </div>
          </>
        ) : (
          <div>No books</div>
        )}
      </div>
    </section>
  );
}
