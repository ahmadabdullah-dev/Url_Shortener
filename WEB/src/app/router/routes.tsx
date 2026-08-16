import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import Dashboard from "../components/Dashboard";
import ErrorPage from "../../features/error/ErrorPage";
import NotFound from "../../features/error/NotFound";
import LoginForm from "../../features/auth/LoginForm";
import RegisterForm from "../../features/auth/RegisterForm";
import RequireAuth from "./RequireAuth";

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
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);