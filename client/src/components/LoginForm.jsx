import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import ErrorMsg from "./ErrorMsg";
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
  const { loginUser, error, loginIsLoading, loginIsError } = useAppContext();
  const navigate = useNavigate();

  function handleLogin(values) {
    const { email, password } = values;
    loginUser({ email, password }, reset, navigate);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
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

      {loginIsError && (
        <div className="mb-4">
          <ErrorMsg label="Error">{error}</ErrorMsg>
        </div>
      )}

      <FormButton type="submit" loading={loginIsLoading}>
        Login {loginIsLoading && <LoadingSpinner />}
      </FormButton>
    </form>
  );
}
