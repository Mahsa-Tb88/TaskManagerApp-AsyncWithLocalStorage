import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { getUsers } from "../utils/api";

export default function Branch() {
  const { state, dispatch } = UseUserContext();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMultiUserLoading, setIsMultiUserLoading] = useState(true);
  const [multiUserLoadingError, setMultiUserLoadingError] = useState(false);
  const listOfProvince = [
    "British Columbia",
    "Alberta",
    "Manitoba",
    "New Brunswick",
    "Nova Scotia",
    "Ontario",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ];
  const [delay, setDelay] = useState(20);

  useEffect(() => {
    dispatch({ type: "setPageTitle", payload: params.BranchName });
    // console.log(searchParams.get("user"), params.BranchName);
    const timeOut = setTimeout(fetchUsers, delay);
    return () => clearTimeout(timeOut);
  }, [params.BranchName, searchParams.get("user")]);

  async function fetchUsers() {
    setIsMultiUserLoading(true);
    const result = await getUsers(searchParams.get("user"), params.BranchName);
    if (result.success) {
      dispatch({ type: "setUsers", payload: result.body });
    } else {
      setMultiUserLoadingError({
        status: false,
        message: result.message,
        code: result.code,
      });
    }
    setIsMultiUserLoading(false);
  }

  function userInfoHandler(id) {
    navigate(`/user/${id}`);
  }

  function searchUserHandler(value) {
    setSearchParams({ user: value });
    setDelay(1000);
  }

  let content = "";
  if (isMultiUserLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (state.multiUserLoadingError) {
    content = (
      <div>
        <span>{state.multiLoadingError.message}</span>
        <button className="btn btn-primary" onClick={fetchUsers}>
          Try again
        </button>
      </div>
    );
  } else if (!state.users.length) {
    content = (
      <div>
        <div className="inputSearchUser">
          <input
            type="text"
            placeholder="Search..."
            className="searchUser"
            value={searchParams.get("user") || ""}
            onChange={(e) => searchUserHandler(e.target.value)}
          />
        </div>
        <p className="bg-primary mt-3 p-2 text-white fs-5">There is no users</p>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="inputSearchUser">
          <input
            type="text"
            placeholder="Search..."
            className="searchUser"
            value={searchParams.get("user") || ""}
            onChange={(e) => searchUserHandler(e.target.value)}
          />
        </div>
        <table className="table table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr className="table-row">
              <th scope="col">row</th>
              <th scope="col">Image</th>
              <th scope="col">Full Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Province</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user, index) => (
              <tr
                key={user.id}
                className="table-row user-row"
                onClick={() => userInfoHandler(user.id)}
              >
                <th scope="row">{index + 1}</th>
                <td>
                  <img className="img-user" width="30" src={user.avatarURL} />{" "}
                </td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.phone}</td>
                <td>{listOfProvince[user.province]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div className="mx-auto w-75 branch mt-5">{content}</div>;
}
