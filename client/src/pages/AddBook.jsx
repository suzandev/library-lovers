import PropTypes from "prop-types";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";
import FormBody from "../components/FormBody";
import LoginBg from "../components/LoginBg";

export default function AddBook({ editBook }) {
  return (
    <section>
      <LoginBg title={editBook ? "Update book" : "Add new book"} />

      <FormBody>{editBook ? <EditBookForm /> : <AddBookForm />}</FormBody>
    </section>
  );
}

AddBook.propTypes = {
  editBook: PropTypes.bool,
};
