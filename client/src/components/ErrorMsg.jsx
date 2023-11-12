import PropTypes from "prop-types";
export default function ErrorMsg({ children, label }) {
  return (
    <div
      className="relative border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong className="font-bold">{label}:</strong>{" "}
      <span className="block sm:inline">{children}</span>
    </div>
  );
}

ErrorMsg.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};
