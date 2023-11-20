import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import useBorrowBook from "../hooks/useBorrowBook";
import LoadingSpinner from "./LoadingSpinner";
import useAuth from "../hooks/useAuth";

export default function BookBorrowForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { borrowBook, isLoading } = useBorrowBook();
  const { user } = useAuth();

  const handleBorrow = handleSubmit((values) => {
    borrowBook(values, {
      onSettled: () => {
        reset();
      },
    });

    document.getElementById("my_modal_1").close();
  });

  return (
    <form method="dialog" onSubmit={handleBorrow}>
      {/* if there is a button in form, it will close the modal */}
      <button
        type="button"
        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-brand-green"
        onClick={() => document.getElementById("my_modal_1").close()}
      >
        ✕
      </button>
      <FormRow id="email" label="Email" errors={errors}>
        <Input
          type="email"
          defaultValue={user?.email}
          form={register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Name" id="name" errors={errors}>
        <Input
          type="text"
          defaultValue={user?.name}
          form={register("name", {
            required: "Please tell us your user name",
            min: 2,
            max: 50,
          })}
        />
      </FormRow>

      <FormRow label="Return Date" id="returnDate" errors={errors}>
        <Input
          type="date"
          form={register("returnDate", {
            required: "Please tell us your user name",
            validate: (value) =>
              value >= new Date().toISOString().split("T")[0] ||
              "Return date cannot be in the past",
          })}
        />
      </FormRow>

      <FormButton type="submit" loading={isLoading}>
        Borrow
        {isLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
