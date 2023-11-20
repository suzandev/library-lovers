import PropTypes from "prop-types";

export default function SelectOptions({ form, defaultValue, options = [] }) {
  return (
    <select
      id={form.name}
      defaultValue={defaultValue}
      {...form}
      className="w-full border-none bg-brand-gray px-4 py-2 text-sm text-brand-text outline-none outline-1 outline-gray-300 focus:outline-brand-green"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.value === defaultValue}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}

SelectOptions.propTypes = {
  options: PropTypes.array,
  form: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};
