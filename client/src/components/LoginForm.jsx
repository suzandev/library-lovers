import FormButton from "./FormButton";
import Input from "./Input";

export default function LoginForm() {
  return (
    <form className="w-full">
      <Input type="email" id="email" label="Email" />
      <Input type="password" id="password" label="Password" />
      <FormButton type="submit">Login</FormButton>
    </form>
  );
}