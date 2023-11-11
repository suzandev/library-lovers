import { categoryOptions } from "../constant";
import FormButton from "./FormButton";
import Input from "./Input";
import SelectOptions from "./SelectOptions";

export default function AddBookForm() {
  return (
    <form className="w-full">
      <Input type="file" id="image" label="Image" />
      <Input type="text" id="name" label="Name" />
      <Input type="text" id="author" label="Author" />
      <SelectOptions label="Category" id="category" options={categoryOptions} />
      <Input type="number" id="quantity" label="Quantity" />
      <Input type="number" id="rating" label="Rating" />
      <Input type="textarea" id="short_description" label="Description" />
      <FormButton>Add book</FormButton>
    </form>
  );
}
