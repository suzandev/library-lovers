import PropTypes from "prop-types";
import AppButton from "./AppButton";

export default function EnvironmentCard({ environment }) {
  return (
    <div className="bg-brand-white w-full border-r p-4 md:max-w-sm">
      <h3 className="text-brand-text text-xl font-bold">{environment.name}</h3>
      <p className="text-brand-text my-10 text-sm">
        {environment.description.slice(0, 110)}...
      </p>
      <AppButton title="Explore" to={`environment/${environment.to}`} />
    </div>
  );
}

EnvironmentCard.propTypes = {
  environment: PropTypes.object.isRequired,
};
