import axiosInstance from "./axiosInstance";

export async function getBooks({ category, abo }) {
  try {
    const { data } = await axiosInstance.get(
      `books/?category=${category}&abo=${abo}`,
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function addBook(body) {
  try {
    const { data } = await axiosInstance.post("books", body);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function getBook(id) {
  try {
    const { data } = await axiosInstance.get(`books/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function borrowBook(body) {
  try {
    const { data } = await axiosInstance.post("books/user/borrowed", body);

    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function getBorrowedBooks() {
  try {
    const { data } = await axiosInstance.get("books/user/borrowed");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}
