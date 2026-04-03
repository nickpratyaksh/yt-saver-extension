import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import SettingsPage from "./routes/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="p-10">
        <Home />
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/index.html",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
