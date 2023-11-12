import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";

export default function AppButton({
  title,
  to,
  transparent,
  type,
  handleClick,
}) {
  return type === "button" ? (
    <FormButton type="button" handleClick={handleClick}>
      {title}
    </FormButton>
  ) : (
    <Link
      to={to}
      className={`${
        transparent
          ? "border-brand-green text-brand-green hover:bg-brand-green bg-transparent hover:text-white"
          : "bg-brand-green hover:text-brand-green hover:bg-brand-white hover:border-brand-green text-white"
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
};
