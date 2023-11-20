import PropTypes from "prop-types";

export default function User({ user }) {
  return (
    <div className="group relative ml-auto mr-4">
      <img
        src={user?.picture || "/user_placeholder.jpg"}
        alt="user"
        className="w-8 rounded-full border border-brand-green object-cover md:w-10"
      />
      <p
        className="absolute left-1/2 top-2 z-50 m-4 mx-auto min-w-max -translate-x-1/2 translate-y-full break-keep rounded-md 
    bg-brand-green px-2 py-1 text-center text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {user?.name}
      </p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object,
};
