import FormBody from "../components/FormBody";
import LoginBg from "../components/LoginBg";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <section>
      <LoginBg />

      <FormBody>
        <LoginForm />
      </FormBody>
    </section>
  );
}
