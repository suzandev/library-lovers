import ReactStars from "react-rating-stars-component";
import AppButton from "../components/AppButton";
import BookBorrowForm from "./BookBorrowForm";
export default function Details() {
  const book = {
    id: "01HES1WNVH5QEMQJRQ4N2W85KV",
    image: "http://dummyimage.com/1600x2560.png/cc0000/ffffff",
    name: "Unfaithful",
    quantity: 95,
    author: "Florri Ramlot",
    category: "Drama|Thriller",
    short_description:
      "Bypass Right Cephalic Vein to Upper Vein with Autologous Arterial Tissue, Open Approach",
    rating: 2.1,
  };

  return (
    <>
      <div className="my-6 flex flex-wrap items-start justify-evenly">
        <div className="h-96 shadow-md">
          <img
            src={book.image}
            alt={book.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-brand-text text-3xl max-md:text-lg">
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
          <p className="text-brand-text text-sm">{book.short_description}</p>
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
