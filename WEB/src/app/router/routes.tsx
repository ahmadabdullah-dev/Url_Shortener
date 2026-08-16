import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/App";
import Dashboard from "../components/Dashboard";
import ErrorPage from "../../features/error/ErrorPage";
import NotFound from "../../features/error/NotFound";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
  
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);