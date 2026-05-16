import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { RedirectPage } from "./pages/RedirectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/short/:codigo",
    element: <RedirectPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
