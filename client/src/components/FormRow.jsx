import PropTypes from "prop-types";
import ErrorMsg from "./ErrorMsg";
export default function FormRow({ children, id, label, errors }) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3">
      <label htmlFor={id} className="text-brand-text text-lg font-medium">
        {label}
      </label>
      {children}
      {errors && errors[id]?.message && (
        <ErrorMsg label={label}>{errors[id]?.message}</ErrorMsg>
      )}
    </div>
  );
}

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  errors: PropTypes.object,
};
