import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { login, isLoading } = useLogin();

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(({ email, password }) => {
        login(
          { email, password },
          {
            onSettled() {
              reset();
            },
          },
        );
      })}
    >
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
          })}
        />
      </FormRow>

      <FormButton type="submit" loading={isLoading}>
        Login {isLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
