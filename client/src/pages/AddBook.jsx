import AddBookForm from "../components/AddBookForm";
import FormBody from "../components/FormBody";
import LoginBg from "../components/LoginBg";

export default function AddBook() {
  return (
    <section>
      <LoginBg title="Add new book" />

      <FormBody>
        <AddBookForm />
      </FormBody>
    </section>
  );
}
