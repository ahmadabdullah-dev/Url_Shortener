import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import Dashboard from "../components/Dashboard";
import ErrorPage from "../../features/error/ErrorPage";
import NotFound from "../../features/error/NotFound";
import LoginForm from "../../features/auth/LoginForm";
import RegisterForm from "../../features/auth/RegisterForm";
import RequireAuth from "./RequireAuth";
import MyProfile from "../../features/user/MyProfile";
import RedirectToOriginalUrl from "../../features/url/RedirectToOriginalUrl";
import ConfirmEmailForm from "../../features/auth/ConfirmEmailForm";
import RequireConfirmedEmail from "./RequireCOnfirmedEmail";
import ForgetPasswordForm from "../../features/auth/ForgetPassword";
import ResetPasswordForm from "../../features/auth/ResetPasswordForm";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <RequireConfirmedEmail />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "my-profile", element: <MyProfile /> },
            ],
          },

          { path: "/:shortCode", element: <RedirectToOriginalUrl /> },
          { path: "/confirm-email", element: <ConfirmEmailForm /> },
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "forget-password", element: <ForgetPasswordForm /> },
      { path: "reset-password/:email", element: <ResetPasswordForm /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
