import PropTypes from "prop-types";
import AppButton from "./AppButton";
import RatingForm from "./RatingForm";
import useReturnBook from "../hooks/useReturnBook";
import { useEffect } from "react";

export default function BorrowCard({ bookInfo }) {
  const { book } = bookInfo;
  const { openForm, returnBook, isLoading } = useReturnBook();

  useEffect(() => {
    if (!isLoading && openForm) {
      document.getElementById("my_modal_2").showModal();
    }
  }, [isLoading, openForm]);

  return (
    <>
      <div className="bg-brand-white shadow-md">
        <div className="h-60 w-full overflow-hidden">
          <img
            src={book.image}
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
            <div className="w-fit space-y-4">
              <div>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Borrowed Date: {bookInfo.borrowedDate}
                </span>
              </div>
              <div>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Return Date: {bookInfo.returnDate}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <AppButton
              type="button"
              title="Return this book"
              loading={isLoading}
              handleClick={() => {
                returnBook({ borrowId: bookInfo._id });
              }}
            />
          </div>
        </div>
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-brand-white">
          <RatingForm bookId={book._id} borrowId={bookInfo._id} />
        </div>
      </dialog>
    </>
  );
}

BorrowCard.propTypes = {
  bookInfo: PropTypes.object,
};
