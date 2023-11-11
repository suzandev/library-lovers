import AppButton from "./AppButton";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <SectionHeading
          titleSmall="TESTIMONIAL"
          titleBlue="What says"
          titleGreen="Our students"
        />
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
