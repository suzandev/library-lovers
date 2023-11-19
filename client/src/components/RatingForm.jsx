import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import { useForm, Controller } from "react-hook-form";
import ReactStars from "react-rating-stars-component";

export default function RatingForm() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
        document.getElementById("my_modal_2").close();
      })}
    >
      <FormRow
        id="review"
        label="Write a Review about the book"
        errors={errors}
      >
        <Input
          type="textarea"
          form={register("review", {
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

      <FormButton type="submit">
        Submit
        {/* {isLoading && <LoadingSpinner />} */}
      </FormButton>
    </form>
  );
}
