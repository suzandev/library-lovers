import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";
import LoadingSpinner from "./LoadingSpinner";

export default function AppButton({
  title,
  to,
  transparent,
  type,
  handleClick,
  loading,
}) {
  return type === "button" ? (
    <FormButton type="button" handleClick={handleClick} loading={loading}>
      {title} {loading && <LoadingSpinner />}
    </FormButton>
  ) : (
    <Link
      to={to}
      className={`${
        transparent
          ? "border-brand-green bg-transparent text-brand-green hover:bg-brand-green hover:text-white"
          : "bg-brand-green text-white hover:border-brand-green hover:bg-brand-white hover:text-brand-green"
      }  w-full  border px-4 py-2 text-center text-sm font-medium transition`}
    >
      {title}
    </Link>
  );
}

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  transparent: PropTypes.bool,
  type: PropTypes.string,
  handleClick: PropTypes.func,
  loading: PropTypes.bool,
};
