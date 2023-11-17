import PropTypes from "prop-types";

export default function FormButton({ type, children, handleClick, loading }) {
  return (
    <button
      type={type}
      className="flex w-full items-center justify-center gap-3 bg-brand-green px-4 py-2 text-center text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-500"
      onClick={handleClick}
      disabled={loading}
    >
      {children}
    </button>
  );
}

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  loading: PropTypes.bool,
};
