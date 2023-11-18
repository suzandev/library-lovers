import PropTypes from "prop-types";

export default function Errorfallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-gray p-16">
      <div className="flex-1 border-zinc-400 bg-brand-white p-16 text-center">
        <h1>Something went wrong</h1>
        <p>Error: {error.message}</p>
        <button onClick={resetErrorBoundary}> Try Again</button>
      </div>
    </div>
  );
}

Errorfallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
