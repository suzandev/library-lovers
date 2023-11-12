import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function handleLogin(values) {
    const { email, password } = values;
    console.log(values);
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
      <FormButton type="submit">Login</FormButton>
    </form>
  );
}
