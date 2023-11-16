import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import SectionHeading from "../components/SectionHeading";
import { sliderContent } from "../constant";

export default function BorrowedBooks() {
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
        <div className="grid gap-4 max-sm:grid-cols-2 sm:grid-cols-3">
          {sliderContent.map((category) => (
            <BookCard key={category.name} book={category} type="book" />
          ))}
        </div>
        <div className="flex justify-end">
          <Pagination />
        </div>
      </div>
    </section>
  );
}
