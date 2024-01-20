import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import TableUser from "../components/TableUser";
import Welcome from "../components/Welcome";
import UserInfo from "../components/UserInfo";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "user",
        children: [
          { index: true, element: <Navigate to={"/"} replace={true} /> },
          {
            path: "newUser",
            element: <TableUser />,
          },
          { path: ":id", element: <UserInfo /> },
          { path: ":id/edit", element: <TableUser /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;

// { path: "/newUser", element: <TableUser /> },
// { path: "/user/:id", element: <UserInfo /> },
// { path: "/user/:id/edit", element: <TableUser /> },
