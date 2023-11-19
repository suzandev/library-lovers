import { useQuery } from "@tanstack/react-query";
import { slider as sliderApi } from "../services/bookApi";

export default function useSlider() {
  const {
    data: slider,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["slider"],
    queryFn: sliderApi,
  });

  return { slider: slider?.books, isLoading, isError };
}
