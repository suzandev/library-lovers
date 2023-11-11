import PropTypes from "prop-types";
export default function SectionHeading({ titleSmall, titleBlue, titleGreen }) {
  return (
    <div className="mb-6">
      <h4 className="text-brand-green text-sm font-bold uppercase">
        {titleSmall}
      </h4>
      <h2 className="text-brand-text text-xl font-bold md:text-4xl">
        {titleBlue} <span className="text-brand-green">{titleGreen}</span>
      </h2>
    </div>
  );
}

SectionHeading.propTypes = {
  titleSmall: PropTypes.string,
  titleBlue: PropTypes.string,
  titleGreen: PropTypes.string,
};
