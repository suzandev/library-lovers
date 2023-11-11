import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function BookCard({ book, type }) {
  return (
    <Link to={`books/${book.to}`} className="bg-brand-white shadow-md">
      <div className="h-60 w-full overflow-hidden">
        <img src={book.image} alt={book.name} className="w-full object-cover" />
      </div>

      {type !== "book" && (
        <div className="flex items-center justify-between space-y-4 p-4">
          <div>
            <h3 className="bg-brand-green w-fit px-2 py-1 text-lg font-bold text-white max-sm:text-sm">
              {book.name}
            </h3>
            <p className="text-brand-text text-xl font-bold max-sm:text-sm">
              {book.title}
            </p>
          </div>
          <div className="bg-brand-green font=fw-bold flex h-16 w-16 items-center justify-center rounded-full text-lg text-white max-sm:text-sm">
            {book.qty}
          </div>
        </div>
      )}
    </Link>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
  type: PropTypes.string,
};
