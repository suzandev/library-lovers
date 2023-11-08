import PropTypes from "prop-types";
import AppButton from "./AppButton";

export default function SliderContent({ book }) {
  return (
    <div className="bg-brand-white w-full p-4 shadow-sm">
      <div className="bg-brand-gray flex justify-evenly p-5">
        <div className="max-w-lg space-y-4">
          <h4 className="text-lg text-gray-500">{book.name}</h4>
          <h2 className="text-brand-text text-lg font-bold sm:text-3xl">
            {book.title}
          </h2>
          <p className="text-brand-text text-sm">{book.description}</p>
          <div className="flex gap-2">
            <AppButton title="Borrow" to="/" />
            <AppButton title="Read" to="/" />
          </div>
        </div>

        <div className="drop-shadow-lg">
          <img
            src={book.image}
            alt={book.name}
            className="h-72 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

SliderContent.propTypes = {
  book: PropTypes.object.isRequired,
};
