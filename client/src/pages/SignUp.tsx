import React, { useState, useEffect } from "react";
import image from "/images/task-men.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { userSignup, verifyOtp } from "@/redux/actions/user.action";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Validation schema for signup form using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

// Validation schema for OTP
const OTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

const SignUp: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timer, setTimer] = useState(120);
  // const [otpError, setOtpError] = useState("");
  const [signupData, setSignupData] = useState<IUser | null>(null);
  const { loading, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle the countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isDialogOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // setOtpError("OTP expired. Please request a new OTP.");
      toast.error("OTP expired");
      clearInterval(interval!);
      setIsDialogOpen(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDialogOpen, timer]);

  // Format the timer into MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const initialValues: IUser & { confirmPassword: string } = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: IUser & { confirmPassword: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userSignupData } = values;
    setSignupData(userSignupData);
    const { payload } = await dispatch(userSignup(userSignupData));
    if (payload.status) {
      setIsDialogOpen(true);
      setTimer(120);
      // setOtpError("");
    }
  };

  const handleOTPSubmit = async (values: { otp: string }) => {
    // if (timer === 0) {
    //   setOtpError("OTP expired. Please request a new OTP.");
    // } else {
    //   console.log("values:", values);
    //   console.log("User Data:", signupData);
    if (values && signupData) {
      const { payload } = await dispatch(
        verifyOtp({ ...signupData, otp: values.otp })
      );
      if (payload.status) {
        setIsDialogOpen(false);
      }
    }
    // }
  };

  // const handleResendOTP = () => {
  //   setTimer(120);
  //   setOtpError("");
  // };

  useEffect(() => {
    if (user?._id) {
      navigate("/task");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side - Sign Up form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Get Started</h2>
            <p className="text-gray-600">
              Welcome to TaskFlow - Let's create your account
            </p>
          </div>

          {/* Formik form */}
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    className="mt-1"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="mt-1"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-00"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Sign up"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a
              className="text-bg-black font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </a>
          </p>
        </div>

        {/* Right side - Marketing content */}
        <div className="w-full md:w-1/2 bg-white p-6 text-black flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-serif mb-4">
              Turn chaos into clarity.
            </h2>
            <h2 className="text-3xl font-serif mb-4">
              Manage your tasks, manage your success.
            </h2>
          </div>
          <img src={image} className="rounded-lg" />
        </div>

        {/* OTP Modal Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={OTPSchema}
              onSubmit={handleOTPSubmit}
            >
              {() => (
                <Form>
                  <DialogHeader>
                    <DialogTitle>OTP Verification</DialogTitle>
                    <DialogDescription>
                      Enter the 6-digit OTP sent to your email:
                      {signupData?.email}
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Field
                      name="otp"
                      as={Input}
                      placeholder="Enter OTP"
                      className="mt-2"
                    />
                    <ErrorMessage
                      name="otp"
                      component="p"
                      className="text-red-600"
                    />
                  </div>

                  <DialogFooter className="flex items-center justify-between mt-4">
                    {/* {timer === 0 && (
                      <Button variant="outline" onClick={handleResendOTP}>
                        Resend OTP
                      </Button>
                    )} */}
                    <span className="text-gray-700 text-lg">
                      {formatTime(timer)}
                    </span>
                    <Button type="submit">Verify</Button>
                  </DialogFooter>
                  {/* {otpError && <p className="text-red-600">{otpError}</p>} */}
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SignUp;
