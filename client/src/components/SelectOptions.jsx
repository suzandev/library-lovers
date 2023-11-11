import PropTypes from "prop-types";

export default function SelectOptions({ id, label, options = [] }) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3">
      <label htmlFor={id} className="text-brand-text text-lg font-medium">
        {label}
      </label>
      <select
        name={id}
        id={id}
        className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
      >
        <option selected hidden>
          Select category
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectOptions.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array,
};
