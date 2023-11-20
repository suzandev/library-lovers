import PropTypes from "prop-types";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AppButton from "./AppButton";

export default function BookCard({ book, type }) {
  const { user } = useAuth();
  return type === "book" ? (
    <div className="bg-brand-white shadow-md">
      <div className="h-60 w-full overflow-hidden">
        <img src={book.image} alt={book.name} className="w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between">
          <div className="flex-1 space-y-2">
            <h5 className="text-xs text-brand-text">{book.author}</h5>
            <h3 className="text-lg font-bold text-brand-text max-sm:text-sm">
              {book.name.slice(0, 50)}
            </h3>
            <h4 className="w-fit bg-brand-green p-1 px-2 text-sm font-medium text-white">
              {book.category}
            </h4>
          </div>
          <div className="w-fit space-y-6">
            <ReactStars
              count={5}
              half={true}
              value={parseInt(book.rating)}
              edit={false}
              size={24}
              activeColor="#32cb81"
              color="#c0c0c0"
            />

            <span
              className={`${
                book.quantity === 0
                  ? "bg-red-50 text-red-700 ring-red-600/20"
                  : "bg-green-50 text-green-700 ring-green-600/20"
              } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset`}
            >
              Available {book.quantity} {book.quantity > 1 ? "books" : "book"}
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <AppButton to={`/books/details/${book._id}`} title="Details" />

          {/* This button will show if user role is librarian */}
          {user?.role === "librarian" && (
            <AppButton to={`/books/edit/${book._id}`} title="Update" />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Link
      to={`books/category/${book.to}/?page=1`}
      className="bg-brand-white shadow-md"
    >
      <div className="h-60 w-full overflow-hidden">
        <img src={book.image} alt={book.name} className="w-full object-cover" />
      </div>
      <div className="flex items-center justify-between p-4">
        <h3 className="w-fit bg-brand-green px-2 py-1 text-lg font-bold text-white max-sm:text-sm">
          {book.name}
        </h3>
        <p className="text-xl font-bold text-brand-text max-sm:text-sm">
          {book.title}
        </p>
      </div>
    </Link>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
  type: PropTypes.string,
};
