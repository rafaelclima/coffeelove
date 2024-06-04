import { Checkout } from "./pages/checkout/Checkout";
import { Home } from "./pages/home/Home";
import { RootLayout } from "./layouts/RootLayout/RootLayout";
import { Success } from "./pages/success/Success";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/success", element: <Success /> },
    ],
  },
  { path: "*", element: <div>Página não encontrada!!</div> },
]);
