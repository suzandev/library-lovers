import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import ErrorMsg from "./ErrorMsg";
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
  const { registerUser, error, registerIsLoading, registerIsError } =
    useAppContext();
  const navigate = useNavigate();

  function handleRegister(values) {
    const { name, email, password } = values;
    registerUser({ name, email, password }, reset, navigate);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
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

      {registerIsError && (
        <div className="mb-4">
          <ErrorMsg label="Error">{error}</ErrorMsg>{" "}
        </div>
      )}

      <FormButton type="submit" loading={registerIsLoading}>
        Register {registerIsLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
