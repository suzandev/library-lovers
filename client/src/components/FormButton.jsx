import PropTypes from "prop-types";

export default function FormButton({ type, children, handleClick }) {
  return (
    <button
      type={type}
      className="bg-brand-green w-full px-4  py-2 text-center text-sm font-medium text-white"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};
