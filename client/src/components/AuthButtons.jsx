import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import AppButton from "./AppButton";
import User from "./User";
import DarkThemeToggler from "./DarkThemeToggler";

export default function AuthButtons({ smallDev }) {
  const { isAuthenticated, librarian, user } = useAuth();
  const { logout, isLoading } = useLogout();

  return (
    <div className="flex items-center">
      {isAuthenticated && <User user={user} />}

      <div className="flex items-center gap-4 max-md:hidden">
        <div
          className={`${
            smallDev ? "flex flex-col gap-4" : "flex gap-4 max-md:hidden"
          }`}
        >
          {isAuthenticated ? (
            <>
              {librarian && <AppButton title="Add" to="/add-book" />}
              <AppButton
                title="Logout"
                to="/"
                type="button"
                handleClick={logout}
                loading={isLoading}
              />
            </>
          ) : (
            <AppButton title="Login" to="/login" />
          )}
        </div>
        <DarkThemeToggler />
      </div>
    </div>
  );
}

AuthButtons.propTypes = {
  smallDev: PropTypes.bool,
};
