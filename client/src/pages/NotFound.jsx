import { FaExclamationCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  const gradientStyles = {
    background: "linear-gradient(to right, #11998E, #38EF7D)",
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={gradientStyles}
    >
      <div className="flex flex-col items-center gap-5 rounded-lg bg-white bg-opacity-25 p-8 text-center shadow-lg backdrop-blur-md">
        <FaExclamationCircle className="mb-4 text-6xl text-red-500" />
        <h1 className="mb-4 text-4xl font-bold text-white">404 Not Found</h1>
        <p className="mx-auto max-w-sm text-brand-text">
          Oops! The page you are looking for does not exist. Please check the
          URL or go back to the homepage.
        </p>
        <Link
          to={-1}
          className="mt-4 inline-flex items-center rounded-md bg-white px-6 py-3 text-green-700 transition duration-300 hover:text-green-500"
        >
          <FaHome className="mr-2" />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
