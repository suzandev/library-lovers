import axiosInstance from "./axiosInstance";
import catchAsync from "./catchAsync";

export const getBooks = catchAsync(async ({ category, abo }) => {
  const { data } = await axiosInstance.get(
    `books/?category=${category}&abo=${abo}`,
  );
  return data;
});

export const addBook = catchAsync(async (body) => {
  const { data } = await axiosInstance.post("books", body);
  return data;
});

export const getBook = catchAsync(async (id) => {
  const { data } = await axiosInstance.get(`books/${id}`);
  return data;
});

export const borrowBook = catchAsync(async (body) => {
  const { data } = await axiosInstance.post("books/user/borrowed", body);
  return data;
});

export const getBorrowedBooks = catchAsync(async (page) => {
  const { data } = await axiosInstance.get(`books/user/borrowed/?page=${page}`);
  return data;
});
