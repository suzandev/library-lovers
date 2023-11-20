import { useState } from "react";
import AppButton from "./AppButton";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/reviewApi";

export default function Testimonials() {
  const [reviewPage, setReviewPage] = useState(1);
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", reviewPage],
    queryFn: () => getReviews(reviewPage),
  });

  return isLoading ? (
    <>Loading...</>
  ) : (
    <div className="my-10">
      <div className="flex items-center justify-between">
        <SectionHeading
          titleSmall="TESTIMONIAL"
          titleBlue="What says"
          titleGreen="Our students"
        />
        {reviews?.pages > 1 && (
          <div className="flex gap-4">
            <AppButton
              title="<"
              type="button"
              onClick={() =>
                setReviewPage((prevPage) => {
                  if (prevPage === 1) return prevPage;
                  return prevPage - 1;
                })
              }
            />
            <AppButton
              title=">"
              type="button"
              onClick={() =>
                setReviewPage((prevPage) =>
                  reviews?.pages < prevPage ? prevPage + 1 : prevPage,
                )
              }
            />
          </div>
        )}
      </div>
      {isError ? (
        <>{error}</>
      ) : (
        <div className="flex flex-wrap justify-center gap-y-4 bg-brand-white">
          {reviews?.reviews.length > 0 &&
            reviews?.reviews.map((review) => (
              <TestimonialCard key={review._id} review={review} />
            ))}
        </div>
      )}
    </div>
  );
}
