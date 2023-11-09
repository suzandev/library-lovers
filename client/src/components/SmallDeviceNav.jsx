import PropTypes from "prop-types";
import { HiOutlineXMark } from "react-icons/hi2";
import AuthButtons from "./AuthButtons";
import Navigation from "./Navigation";

export default function SmallDeviceNav({ handleClose }) {
  return (
    <div className="bg-brand-white absolute inset-0 z-10 flex flex-col justify-between p-10 md:hidden">
      <button
        className="text-brand-green absolute right-10 top-10"
        onClick={handleClose}
      >
        <HiOutlineXMark className="text-3xl" />
      </button>
      <Navigation smallDev={true} />
      <AuthButtons smallDev={true} />
    </div>
  );
}

SmallDeviceNav.propTypes = {
  handleClose: PropTypes.func,
};
