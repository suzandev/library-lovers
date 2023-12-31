import { useForm } from "react-hook-form";
import { categoryOptions } from "../constant";
import useAddBook from "../hooks/useAddBook";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import SelectOptions from "./SelectOptions";

export default function AddBookForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { addBook, isLoading } = useAddBook();

  function handleAddBook(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("author", values.author);
    formData.append("description", values.short_description);
    formData.append("image", values.image[0]);
    formData.append("category", values.category);
    formData.append("rating", parseInt(values.rating));
    formData.append("quantity", parseInt(values.quantity));
    addBook(formData, {
      onSuccess() {
        reset();
      },
    });
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleAddBook)}>
      <FormRow id="image" label="Image" errors={errors}>
        <Input
          type="file"
          form={register("image", {
            required: "Please upload an image",
          })}
        />
      </FormRow>

      <FormRow id="name" label="Name" errors={errors}>
        <Input
          type="text"
          form={register("name", {
            required: "Tell us the name of the book",
            minLength: {
              value: 2,
              message: "Name needs a minimum of 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Name needs a maximum of 50 characters",
            },
          })}
        />
      </FormRow>

      <FormRow id="author" label="Author" errors={errors}>
        <Input
          type="text"
          form={register("author", {
            required: "Tell us the author name of the book",
            minLength: {
              value: 2,
              message: "Name needs a minimum of 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Name needs a maximum of 50 characters",
            },
          })}
        />
      </FormRow>

      <FormRow id="category" label="Category" errors={errors}>
        <SelectOptions
          options={categoryOptions}
          form={register("category", {
            required: "Please select a category",
          })}
        />
      </FormRow>

      <FormRow id="quantity" label="Quantity" errors={errors}>
        <Input
          type="number"
          form={register("quantity", {
            required: "Tell us quantities of this book",
            min: {
              value: 1,
              message: "Quantity needs a minimum of 1",
            },
          })}
        />
      </FormRow>

      <FormRow id="rating" label="Rating" errors={errors}>
        <Input
          type="number"
          form={register("rating", {
            required: "Tell us rating of this book",
            min: {
              value: 1,
              message: "Rating needs a minimum of 1",
            },
            max: {
              value: 5,
              message: "Rating needs a maximum of 5",
            },
          })}
        />
      </FormRow>

      <FormRow id="short_description" label="Description" errors={errors}>
        <Input
          type="textarea"
          form={register("short_description", {
            required: "Tell us brief description of this book",
            minLength: {
              value: 15,
              message: "Description can not be less than 15 characters",
            },
            maxLength: {
              value: 300,
              message: "Description can not be more than 300 characters",
            },
          })}
        />
      </FormRow>

      <FormButton type="submit" loading={isLoading}>
        Add book {isLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
