import FormBody from "../components/FormBody";
import GoogleButton from "../components/GoogleButton";
import LoginBg from "../components/LoginBg";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <section>
      <LoginBg title="Login" />

      <FormBody
        title="Already A Member? Sign In:"
        footerGuid="Don't have an account?"
        linkTitle="Register Now"
        to="/register"
      >
        <LoginForm />
        <GoogleButton />
      </FormBody>
    </section>
  );
}
