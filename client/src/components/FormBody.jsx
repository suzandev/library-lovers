import PropTypes from "prop-types";

export default function FormBody({ children }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="bg-brand-white border border-gray-300 p-8">
        <h1 className="text-brand-text text-lg font-bold  sm:text-3xl md:text-5xl">
          Already A Member? Sign In:
        </h1>
      </div>

      {children}
    </div>
  );
}

FormBody.propTypes = {
  children: PropTypes.node.isRequired,
};
