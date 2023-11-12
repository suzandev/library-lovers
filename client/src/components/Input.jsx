import PropTypes from "prop-types";

export default function Input({ type, form }) {
  return type === "textarea" ? (
    <textarea
      className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
      rows={5}
      id={form.name}
      {...form}
    ></textarea>
  ) : (
    <input
      className="bg-brand-gray text-brand-text focus:outline-brand-green w-full border-none px-4 py-2 text-sm outline-none outline-1 outline-gray-300"
      type={type}
      id={form.name}
      {...form}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
};
