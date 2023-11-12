import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function FormBody({
  children,
  title,
  linkTitle,
  to,
  footerGuid,
}) {
  return (
    <div className="bg-brand-white mx-auto my-6 flex max-w-lg border border-gray-300">
      <div className="w-full space-y-4 p-8">
        <h1 className="text-brand-text mb-6 text-center  text-lg font-bold sm:text-3xl">
          {title}
        </h1>
        {children}
        <div className="flex w-full items-center justify-center gap-2">
          <p className="text-brand-text text-sm md:text-lg">{footerGuid}</p>
          <Link
            to={to}
            replace={true}
            className="text-brand-green text-sm hover:underline md:text-lg"
          >
            {linkTitle}
          </Link>
        </div>
      </div>
    </div>
  );
}

FormBody.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  linkTitle: PropTypes.string,
  to: PropTypes.string,
  footerGuid: PropTypes.string,
};
