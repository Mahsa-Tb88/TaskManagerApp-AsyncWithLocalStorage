import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TableUser from "../components/TableUser";
import Welcome from "../components/Welcome";
import UserInfo from "../components/UserInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "/newUser", element: <TableUser /> },
      { path: "/user/:id", element: <UserInfo /> },
      { path: "/user/:id/edit", element: <TableUser /> },
    ],
  },
]);

export default router;
