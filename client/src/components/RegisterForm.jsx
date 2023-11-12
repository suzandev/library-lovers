import { useForm } from "react-hook-form";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import Input from "./Input";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function handleRegister(values) {
    const { fullName, email, password } = values;
    console.log(values);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
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
      <FormButton type="submit">Register</FormButton>
    </form>
  );
}
