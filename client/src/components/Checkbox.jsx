import PropTypes from "prop-types";
export default function Checkbox({ uploadImage, setUploadImage }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <input
        type="checkbox"
        className="checkbox-success checkbox"
        value={uploadImage}
        onChange={() => setUploadImage(!uploadImage)}
      />
      <label className="text-lg font-bold text-gray-700">Update image</label>
    </div>
  );
}

Checkbox.propTypes = {
  uploadImage: PropTypes.bool.isRequired,
  setUploadImage: PropTypes.func.isRequired,
};
