import AppButton from "./AppButton";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h4 className="text-brand-green text-sm font-bold uppercase">
            TESTIMONIAL
          </h4>
          <h2 className="text-brand-text text-xl font-bold md:text-4xl">
            What says <span className="text-brand-green">Our students</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <AppButton title="<" type="button" />
          <AppButton title=">" type="button" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-y-4">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>
    </div>
  );
}
