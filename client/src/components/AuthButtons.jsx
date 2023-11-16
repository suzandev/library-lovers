import axios from "axios";
import PropTypes from "prop-types";
import AppButton from "./AppButton";

export default function AuthButtons({ smallDev }) {
  async function logout() {
    await axios.post("http://localhost:3000/auth/logout");
  }

  return (
    <div
      className={`${
        smallDev ? "flex flex-col gap-4" : "flex gap-4 max-md:hidden"
      }`}
    >
      <AppButton title="Login" to="/login" />

      <>
        <AppButton title="Add" to="/add-book" />
        <AppButton title="Logout" to="/" type="button" handleClick={logout} />
      </>
    </div>
  );
}

AuthButtons.propTypes = {
  smallDev: PropTypes.bool,
};
