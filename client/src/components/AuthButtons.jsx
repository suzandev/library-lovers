import PropTypes from "prop-types";
import { useAppContext } from "../hooks/useAppContext";
import AppButton from "./AppButton";

export default function AuthButtons({ smallDev }) {
  const { logoutUser, user } = useAppContext();

  return (
    <div
      className={`${
        smallDev ? "flex flex-col gap-4" : "flex gap-4 max-md:hidden"
      }`}
    >
      {user ? (
        <>
          <AppButton title="Add" to="/add-book" />
          <AppButton
            title="Logout"
            to="/"
            type="button"
            handleClick={logoutUser}
          />
        </>
      ) : (
        <AppButton title="Login" to="/login" />
      )}
    </div>
  );
}

AuthButtons.propTypes = {
  smallDev: PropTypes.bool,
};
