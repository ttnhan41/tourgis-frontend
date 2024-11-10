import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  UserDashboard,
  Landing,
  Register,
  Login,
  Error,
  Map,
  Admin,
} from "./pages";

import { loader as allTouristAttractionsLoader } from "./pages/Map";
import { action as registerAction } from "./pages/Register";
import { loader as validateResultLoader } from "./pages/Login";
import { action as loginAction } from "./pages/Login";
import { loader as userDashboardLoader } from "./pages/UserDashboard";
import { loader as adminLoader } from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: validateResultLoader,
      },
      {
        path: "register",
        element: <Register />,
        loader: validateResultLoader,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        loader: validateResultLoader,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <UserDashboard />,
        loader: userDashboardLoader,
      },
      {
        path: "admin",
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: "map",
        element: <Map />,
        loader: allTouristAttractionsLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
