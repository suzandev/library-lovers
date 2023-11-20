import PropTypes from "prop-types";

export default function Input({ type, form, defaultValue }) {
  return type === "textarea" ? (
    <textarea
      className="w-full border-none bg-brand-gray px-4 py-2 text-sm text-brand-text outline-none outline-1 outline-gray-300 focus:outline-brand-green"
      rows={5}
      defaultValue={defaultValue}
      id={form.name}
      {...form}
    />
  ) : (
    <input
      className="w-full border-none bg-brand-gray px-4 py-2 text-sm text-brand-text outline-none outline-1 outline-gray-300 focus:outline-brand-green"
      type={type}
      id={form.name}
      defaultValue={defaultValue}
      {...form}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};
