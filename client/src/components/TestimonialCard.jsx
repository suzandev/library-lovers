import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";

export default function TestimonialCard({ review }) {
  return (
    <div className="w-full space-y-6 bg-brand-white p-4 md:max-w-sm">
      <div>
        <ReactStars
          count={5}
          half={true}
          value={review?.review?.rating}
          edit={false}
          size={24}
          activeColor="#32cb81"
        />
      </div>
      <p>{review?.review?.comment}</p>
      <div className="flex flex-wrap items-center gap-4 bg-brand-gray">
        <div className="h-20 w-20 overflow-hidden rounded-full">
          <img
            src={review?.user?.picture || "/user_placeholder.jpg"}
            alt="John doe"
            className="w-full object-cover"
          />
        </div>
        <h5 className="text-xl text-brand-text">{review?.user?.name}</h5>
      </div>
    </div>
  );
}

TestimonialCard.propTypes = {
  review: PropTypes.object,
};
