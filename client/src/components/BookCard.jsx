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
        <img
          src={book.image.url}
          alt={book.name}
          className="w-full object-cover"
        />
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
          <div className="w-fit">
            <ReactStars
              count={5}
              half={true}
              value={parseInt(book.rating)}
              edit={false}
              size={24}
              activeColor="#32cb81"
              color="#c0c0c0"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <AppButton to={`/books/details/${book._id}`} title="Details" />

          {/* This button will show if user role is librarian */}
          {user?.role === "librarian" && (
            <AppButton to={`/books/edit/${book.id}`} title="Update" />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Link to={`books/${book.to}`} className="bg-brand-white shadow-md">
      <div className="h-60 w-full overflow-hidden">
        <img src={book.image} alt={book.name} className="w-full object-cover" />
      </div>
      <div className="flex items-center justify-between space-y-4 p-4">
        <div>
          <h3 className="w-fit bg-brand-green px-2 py-1 text-lg font-bold text-white max-sm:text-sm">
            {book.name}
          </h3>
          <p className="text-xl font-bold text-brand-text max-sm:text-sm">
            {book.title}
          </p>
        </div>
        <div className="font=fw-bold flex h-16 w-16 items-center justify-center rounded-full bg-brand-green text-lg text-white max-sm:text-sm">
          {book.qty}
        </div>
      </div>
    </Link>
  );
}

BookCard.propTypes = {
  book: PropTypes.object,
  type: PropTypes.string,
};
