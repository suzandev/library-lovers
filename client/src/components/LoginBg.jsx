import PropTypes from "prop-types";
export default function LoginBg({ title }) {
  return (
    <div className="flex h-96 w-full flex-col items-center justify-center bg-[url('/login_bg.png')] bg-center">
      <h1 className="text-brand-text text-3xl  font-bold md:text-5xl">
        {title}
      </h1>
    </div>
  );
}

LoginBg.propTypes = {
  title: PropTypes.string,
};
