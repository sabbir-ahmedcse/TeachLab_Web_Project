// router.js
import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home";
import Gallery from "../Pages/Gallery";
import Create from "../Pages/Create";
import About from "../Components/About";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Details from "../Pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => fetch("/data.json"), 
        element: <Home />
      },
      {
        path: "gallery",
        loader: () => fetch("/data.json"), 
        element: <Gallery />
      },
      {
        path: "create",
        element: <Create />
      },
      {
        path: "details",
        loader: () => fetch("/data.json"), // ডাটা লোড হবে
        element: <Details />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);

export default router;