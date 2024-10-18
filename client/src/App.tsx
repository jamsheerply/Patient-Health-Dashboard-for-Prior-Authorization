import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { verifyUser } from "./redux/actions/user.action";
import PatientDashboard from "./pages/PatientDashboard";

function App() {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserVerification = async () => {
      try {
        await dispatch(verifyUser());
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    };
    fetchUserVerification();
  }, [dispatch]);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (loading) {
      return <div>Loading...</div>;
    } else {
      // console.log("user.id outside", user?._id);
      if (user && user?._id) {
        // console.log("user.id", user._id);
        return <>{children}</>;
      } else {
        return <Navigate to="/login" />;
      }
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="task" element={<PatientDashboard />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
