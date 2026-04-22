import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import WatchPage from "./pages/WatchPage/WatchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);

export default router;
