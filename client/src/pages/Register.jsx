import FormBody from "../components/FormBody";
import GoogleButton from "../components/GoogleButton";
import LoginBg from "../components/LoginBg";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <section>
      <LoginBg title="Register" />

      <FormBody
        title="Create A New Account:"
        footerGuid="Already have an account?"
        linkTitle="Login"
        to="/login"
      >
        <RegisterForm />
        <GoogleButton title="Sign up" />
      </FormBody>
    </section>
  );
}
