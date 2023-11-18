import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { register: registerUser, isLoading } = useRegister();

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(({ name, email, password }) => {
        registerUser(
          { name, email, password },
          {
            onSettled() {
              reset();
            },
          },
        );
      })}
    >
      <FormRow label="Name" id="name" errors={errors}>
        <Input
          type="text"
          id="name"
          form={register("name", {
            required: "Please tell us your user name",
            min: 2,
            max: 50,
          })}
        />
      </FormRow>

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
      <FormRow id="password" label="Password" errors={errors}>
        <Input
          type="password"
          id="password"
          form={register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormButton type="submit" loading={isLoading}>
        Register {isLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
