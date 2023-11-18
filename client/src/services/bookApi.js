import axiosInstance from "./axiosInstance";

export async function getBooks() {
  try {
    const { data } = await axiosInstance.get("books");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}
