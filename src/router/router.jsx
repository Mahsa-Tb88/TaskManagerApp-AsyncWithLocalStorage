import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import TableUser from "../components/TableUser";
import Welcome from "../components/Welcome";
import UserInfo from "../components/UserInfo";
import NotFound from "../components/NotFound";
import UserCreate from "../components/UserCreate";
import UserEdit from "../components/UserEdit";

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
            element: <UserCreate />,
          },
          { path: ":id", element: <UserInfo /> },
          { path: ":id/edit", element: <UserEdit /> },
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
