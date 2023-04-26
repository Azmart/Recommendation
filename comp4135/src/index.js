import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import TryItPage from "./pages/TryItPage";
import UserInput from "./pages/UserInput";
import Results from "./pages/Results";
import NewResults from "./pages/NewResults";
import UpdatedResults from "./pages/UpdatedResults";
import SampleTry from "./pages/SampleTry";
import Try from "./pages/Try";

import reportWebVitals from "./reportWebVitals";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/try-it",
    element: <TryItPage />,
  },
  {
    path: "/user-input",
    element: <UserInput />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/updated-results",
    element: <UpdatedResults />,
  },
  {
    path: "/sample-try",
    element: <SampleTry />,
  },
  {
    path: "/try",
    element: <Try />,
  },
  {
    path: "/new-results",
    element: <NewResults />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
