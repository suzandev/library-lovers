import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";

export default function BookBorrowForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const handleBorrow = handleSubmit((values) => {
    console.log(values);

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
          id="email"
          form={register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Username" id="username" errors={errors}>
        <Input
          type="text"
          id="username"
          form={register("username", {
            required: "Please tell us your user name",
            min: 2,
            max: 50,
          })}
        />
      </FormRow>

      <FormRow label="Return Date" id="return_date" errors={errors}>
        <Input
          type="date"
          id="return_date"
          form={register("return_date", {
            required: "Please tell us your user name",
            validate: (value) =>
              value >= new Date().toISOString().split("T")[0] ||
              "Return date cannot be in the past",
          })}
        />
      </FormRow>

      <FormButton type="submit">Borrow</FormButton>
    </form>
  );
}
