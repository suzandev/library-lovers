import useReturnBook from "../hooks/useReturnBook";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import { useForm, Controller } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";

export default function RatingForm({ borrowId }) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm();

  const { returnBook, isLoading } = useReturnBook();

  return (
    <form
      onSubmit={handleSubmit((values) => {
        returnBook(
          { ...values, borrowId },
          {
            onSettled: () => {
              reset();
              document.getElementById("my_modal_2").close();
            },
          },
        );
      })}
    >
      <FormRow
        id="comment"
        label="Write a Review about the book"
        errors={errors}
      >
        <Input
          type="textarea"
          form={register("comment", {
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

      <FormRow id="rating" label="Give a Rating to this book" errors={errors}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="rating"
          defaultValue={1}
          render={({ field }) => (
            <ReactStars
              {...field}
              activeColor="#32cb81"
              size={50}
              count={5}
              isHalf={true}
              value={1}
            />
          )}
        />
      </FormRow>

      <FormButton type="submit" loading={isLoading}>
        Submit
        {isLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}

RatingForm.propTypes = {
  borrowId: PropTypes.string.isRequired,
};
