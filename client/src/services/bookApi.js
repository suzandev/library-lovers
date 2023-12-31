import axiosInstance from "./axiosInstance";
import catchAsync from "./catchAsync";

export const slider = catchAsync(async () => {
  const { data } = await axiosInstance.get("slider/books");
  return data;
});

export const getBooks = catchAsync(async ({ category, abo, page }) => {
  const { data } = await axiosInstance.get(
    `books/?category=${category}&abo=${abo}&page=${page}`,
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

export const returnBook = catchAsync(async ({ borrowId, ...body }) => {
  const { data } = await axiosInstance.post(
    `books/user/return/${borrowId}`,
    body,
  );
  return data;
});

export const updateBook = catchAsync(async ({ bookId, body }) => {
  const { data } = await axiosInstance.put(`books/${bookId}`, body);
  return data;
});

export const relatedBooks = catchAsync(async (bookId) => {
  const { data } = await axiosInstance.get(`books/${bookId}/related`);
  return data;
});
