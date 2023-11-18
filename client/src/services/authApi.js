import axiosInstance from "./axiosInstance";

export async function login(email, password) {
  try {
    const { data } = await axiosInstance.post("auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function register(name, email, password) {
  try {
    const { data } = await axiosInstance.post("auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await axiosInstance.get("auth/user/me");
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}

export async function logout() {
  try {
    const { data } = await axiosInstance.post("auth/logout");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || error.response.data);
  }
}
