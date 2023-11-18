import axiosInstance from "./axiosInstance";

export async function getBooks({ category }) {
  let url;
  if (!category) {
    url = "books";
  } else {
    url = `books/?category=${category}`;
  }

  try {
    const { data } = await axiosInstance.get(url);
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
