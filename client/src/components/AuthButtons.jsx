import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import AppButton from "./AppButton";

export default function AuthButtons({ smallDev }) {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`${
        smallDev ? "flex flex-col gap-4" : "flex gap-4 max-md:hidden"
      }`}
    >
      {isAuthenticated ? (
        <>
          <AppButton title="Add" to="/add-book" />
          <AppButton
            title="Logout"
            to="/"
            type="button"
            handleClick={() => {}}
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
