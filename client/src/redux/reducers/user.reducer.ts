import { IUserInitial } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  Userlogin,
  userLogout,
  userSignup,
  verifyOtp,
  verifyUser,
} from "../actions/user.action";
import toast from "react-hot-toast";

const initialState: IUserInitial = {
  loading: false,
  error: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        console.log(payload);
        toast.success(`OTP sent successfully to ${state.user?.email}`);
        state.error = false;
      })
      .addCase(userSignup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })

      // OTP Verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        // console.log("payload", payload);
        state.user = payload.data;
        toast.success("Registration successful");
        state.error = false;
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })

      // User Login
      .addCase(Userlogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(Userlogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data;
        toast.success("Login successful");
      })
      .addCase(Userlogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })

      // Verify User
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = false;
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        // toast.success("user verifyed successful");
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        state.user = null;
        // toast.error(state.error);
      })

      //logout User
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        toast.success("logout successful");
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      });
  },
});

export default userSlice.reducer;
