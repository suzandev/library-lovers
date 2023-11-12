import PropTypes from "prop-types";

export default function SelectOptions({ form, options = [] }) {
  return (
    <select
      id={form.name}
      {...form}
      className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

SelectOptions.propTypes = {
  options: PropTypes.array,
  form: PropTypes.object.isRequired,
};
