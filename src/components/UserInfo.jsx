import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../utils/api";

export default function UserInfo() {
  const { state, dispatch } = UseUserContext();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: "Info User" });

    const timeOut = setTimeout(fetchGetUser, 1000);
    return () => clearTimeout(timeOut);
  }, [params.id]);

  async function fetchGetUser() {
    dispatch({ type: "setIsSingleLoading", payload: true });
    const result = await getUserById(params.id);
    if (result.success) {
      setUser(result.body);
    } else {
      dispatch({
        type: "setSingleLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }
    dispatch({ type: "setIsSingleLoading", payload: false });
  }
  let content = "";

  if (state.isSingleLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (state.singleLoadingError) {
    content = (
      <div className="d-flex flex-column justify-content-between align-items-center">
        <span className="fs-4">{state.singleLoadingError.message}</span>
        <button className="btn btn-primary mt-5">Try again</button>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="d-flex justify-content-start align-items-center">
          <img className="w-25 rounded-circle me-5" src={user.avatarURL} />
          <div>
            <p className="fs-4 mb-4">
              {user.firstname}
              {user.lastname}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn-delete me-3"
                onClick={() => deleteUserHandler(user.id)}
              >
                Delete User
              </button>
              <Link
                className="btn-edit"
                onClick={() => editUserHandler(user.id)}
                to={"/user/" + user.id + "/edit"}
              >
                Edit User
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4  d-flex flex-column justify-content-start align-items-start">
          <div className="p-2 border-bottom section">
            <span className="fs-5">Phone:</span>
            <span className="fs-5 ms-4">{user.phone}</span>
          </div>
          <div className="p-2 border-bottom section ">
            <span className="fs-5">Province:</span>
            <span className="fs-5 ms-4">{user.province}</span>
          </div>
          <div className="p-2 border-bottom section ">
            <span className="fs-5">Description:</span>
            <p className="mt-2 ms-4 desc">{user.desc}</p>
          </div>
        </div>
      </div>
    );
  }
  const id = params.id;
  async function deleteUserHandler(id) {
    const result = await deleteUser(id);
    if (result.success) {
      dispatch({ type: "deleteUser", payload: result.body });
    } else {
      dispatch({
        type: "setSingleLoadingError",
        payload: { message: result.message, code: result.code },
      });
    }

    navigate("/");
    toast.success("Deleted Successfully!");
  }
  async function editUserHandler(id) {
    dispatch({ type: "setPageTitle", payload: "Edit User" });
  }

  return (
    <div className="w-75 userinfo d-flex flex-column justify-content-start align-items-start">
      {content}
    </div>
  );
}
