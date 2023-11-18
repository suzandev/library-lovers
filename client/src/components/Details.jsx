import ReactStars from "react-rating-stars-component";
import AppButton from "../components/AppButton";
import useGetBook from "../hooks/useGetBook";
import BookBorrowForm from "./BookBorrowForm";
export default function Details() {
  const { book } = useGetBook();

  return (
    <>
      <div className="my-6 flex flex-col items-center gap-10">
        <div className="h-96 max-w-sm shadow-md">
          <img
            src={book.image.url}
            alt={book.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl text-brand-text max-md:text-lg">
            {book.name}
          </h2>
          <h4 className="text-gray-500">{book.author}</h4>
          <div>
            <ReactStars
              count={5}
              half={true}
              value={book.rating}
              edit={false}
              size={24}
              activeColor="#32cb81"
            />
          </div>
          <p className="text-sm text-brand-text">{book.description}</p>
          <div className="flex gap-2 max-md:flex-wrap">
            <AppButton
              type="button"
              title="Borrow"
              handleClick={() => {
                document.getElementById("my_modal_1").showModal();
              }}
            />

            <AppButton title="Read" to={`/books/reading/${book.id}`} />
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-brand-white">
          <BookBorrowForm />
        </div>
      </dialog>
    </>
  );
}
