import axiosInstance from "../lib/axios";

export const registerUser = (data) =>
    axiosInstance.post("/users/register", data);

export const loginUser = (data) =>
    axiosInstance.post("/users/login", data);

export const getMe = () =>
    axiosInstance.get("/users/me");

export const logoutUser = () =>
    axiosInstance.post("/users/logout");

export const updateProfileImage = (formData) =>
    axiosInstance.put("/users/profile/image", formData);