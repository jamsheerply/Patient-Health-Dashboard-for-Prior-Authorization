import { axiosInstance } from "@/constants/axiosInstance";
import { IUser } from "@/types/user.types";
import { handleErrors } from "@/utils/handleError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignup = createAsyncThunk(
  "user/signup",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/signup", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verify-otp",
  async (user: IUser & { otp: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/verify-otp", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const Userlogin = createAsyncThunk(
  "user/login",
  async (user: IUser, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/user/login", user);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verify-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user/verify-user");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete("/user/logout");
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
