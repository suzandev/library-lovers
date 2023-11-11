import PropTypes from "prop-types";

export default function Input({ id, label, type, handleChange }) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3">
      <label htmlFor={id} className="text-brand-text text-lg font-medium">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
          onChange={handleChange}
          rows={5}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
          onChange={handleChange}
        />
      )}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  textarea: PropTypes.boolean,
};
