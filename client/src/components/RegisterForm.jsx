import FormButton from "./FormButton";
import Input from "./Input";

export default function RegisterForm() {
  return (
    <form className="w-full">
      <Input type="text" id="username" label="Username" />
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <FormButton type="submit">Register</FormButton>
    </form>
  );
}
