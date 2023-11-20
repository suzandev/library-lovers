import { useForm } from "react-hook-form";
import { categoryOptions } from "../constant";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import SelectOptions from "./SelectOptions";
import useGetBook from "../hooks/useGetBook";
import { useState } from "react";
import Checkbox from "./Checkbox";
import useUpdatebook from "../hooks/useUpdatebook";
import LoadingSpinner from "./LoadingSpinner";

export default function EditBookForm() {
  const [uploadImage, setUploadImage] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { book, isLoading } = useGetBook();
  const { updateBook, updateBookIsLoading } = useUpdatebook();

  // console.log(book);

  const handleEditBook = handleSubmit((values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("author", values.author);
    formData.append("description", values.description);

    formData.append("category", values.category);
    formData.append("rating", parseInt(values.rating));
    formData.append("quantity", parseInt(values.quantity));

    if (!uploadImage) {
      updateBook(formData, {
        onSettled: () => {
          reset();
        },
      });
    } else {
      formData.append("image", values.image[0]);
      updateBook(formData, {
        onSettled: () => {
          reset();
        },
      });
    }
  });

  return isLoading ? (
    <>Loading...</>
  ) : (
    <form method="dialog" className="w-full" onSubmit={handleEditBook}>
      <Checkbox {...{ uploadImage, setUploadImage }} />
      {uploadImage && (
        <FormRow id="image" label="Image" errors={errors}>
          <Input
            type="file"
            form={register("image", {
              required: "Please upload an image",
            })}
          />
        </FormRow>
      )}

      <FormRow label="Name" id="name" errors={errors}>
        <Input
          type="text"
          defaultValue={book?.name}
          form={register("name", {
            required: "Please tell us your user name",
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
          defaultValue={book?.author}
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
          defaultValue={book?.category}
          form={register("category", {
            required: "Please select a category",
          })}
        />
      </FormRow>

      <FormRow id="quantity" label="Quantity" errors={errors}>
        <Input
          type="number"
          defaultValue={book?.quantity?.toString()}
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
          defaultValue={book?.rating?.toString()}
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

      <FormRow id="description" label="Description" errors={errors}>
        <Input
          type="textarea"
          defaultValue={book?.description}
          form={register("description", {
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

      <FormButton type="submit" isLoading={updateBookIsLoading}>
        Update book {updateBookIsLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
