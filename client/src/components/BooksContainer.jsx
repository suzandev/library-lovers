import PropTypes from "prop-types";
import BookCard from "./BookCard";

export default function BooksContainer({ books }) {
  return (
    <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} type="book" />
      ))}
    </div>
  );
}

BooksContainer.propTypes = {
  books: PropTypes.array.isRequired,
};
