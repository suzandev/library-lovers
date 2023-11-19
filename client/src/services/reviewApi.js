import axiosInstance from "./axiosInstance";
import catchAsync from "./catchAsync";

export const postReview = catchAsync(async ({ bookId, borrowId, ...body }) => {
  const { data } = await axiosInstance.post(
    `books/user/review/${bookId}/${borrowId}`,
    body,
  );
  return data;
});
