import axiosInstance from "./axiosInstance";
import catchAsync from "./catchAsync";

export const login = catchAsync(async (email, password) => {
  const { data } = await axiosInstance.post("auth/login", {
    email,
    password,
  });
  return data;
});

export const register = catchAsync(async (name, email, password) => {
  const { data } = await axiosInstance.post("auth/register", {
    name,
    email,
    password,
  });
  return data;
});

export const getCurrentUser = catchAsync(async () => {
  const { data } = await axiosInstance.get("auth/user/me");
  return data;
});

export const logout = catchAsync(async () => {
  const { data } = await axiosInstance.post("auth/logout");
  return data;
});
