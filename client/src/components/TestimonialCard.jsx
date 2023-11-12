import ReactStars from "react-rating-stars-component";

export default function TestimonialCard() {
  return (
    <div className="bg-brand-white w-full space-y-6 p-4 md:max-w-sm">
      <div>
        <ReactStars
          count={5}
          half={true}
          value={5}
          edit={false}
          size={24}
          activeColor="#32cb81"
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor ut labore.
      </p>
      <div className="bg-brand-gray flex flex-wrap items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full">
          <img
            src="http://dummyimage.com/1600x2560.png/cc0000/ffffff"
            alt="John doe"
            className="w-full object-cover"
          />
        </div>
        <h5 className="text-brand-text text-xl">John doe</h5>
      </div>
    </div>
  );
}
