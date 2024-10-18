import React, { useEffect } from "react";
import image from "/images/task-girl.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Userlogin } from "@/redux/actions/user.action";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, user } = useAppSelector((state) => state.user);
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    await dispatch(Userlogin(values));
  };

  useEffect(() => {
    if (user?._id) {
      navigate("/task");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen  bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side - Marketing content */}
        <div className="w-full md:w-1/2 bg-white p-6  text-black lg:flex flex-col justify-between hidden md:block">
          <div>
            <h2 className="text-3xl font-serif mb-4">Get organized,</h2>
            <h2 className="text-3xl font-serif mb-4">
              Get productive, get going!
            </h2>
          </div>
          <img src={image} className=" rounded-lg" />
        </div>
        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 p-8 ">
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
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-gray-600">
              Welcome Back - Please enter your details
            </p>
          </div>

          {/* Formik form */}
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
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
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-00"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="mt-4 text-sm text-center">
            Don't have an account yet?
            <a
              className="text-bg-black font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
