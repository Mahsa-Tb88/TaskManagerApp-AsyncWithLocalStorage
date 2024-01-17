import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { UseUserContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../utils/api";

export default function UserList() {
  const { state, dispatch } = UseUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoading) {
      setIsFirstLoading(false);
      return;
    }
    const timeOut = setTimeout(fetchUsers, 1000);
    return () => clearTimeout(timeOut);
  }, [searchParams]);
  async function fetchUsers() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getUsers(searchParams.get("q"));
    if (result.success) {
      dispatch({ type: "setUsers", payload: result.body });
    } else {
      dispatch({
        type: "setMultiLoadingError",
        payload: {
          message: result.message,
          code: result.code,
        },
      });
    }
    dispatch({ type: "setIsMultiLoading", payload: false });
  }
  function searchHandler(e) {
    if (e.target.value) {
      setSearchParams({ q: e.target.value });
    } else {
      setSearchParams({});
    }
  }

  let content = "";
  if (state.isMultiLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (state.multiLoadingError) {
    content = (
      <div>
        <span>{state.multiLoadingError.message}</span>
        <button className="btn btn-primary">Try again</button>
      </div>
    );
  } else if (!state.users.length) {
    content = (
      <p className="bg-primary mt-3 p-2 text-white fs-5">There is no users</p>
    );
  } else {
    content = state.users.map((user) => <UserItem key={user.id} user={user} />);
  }

  return (
    <div className="w-25 text-center py-4 userList">
      <div className="inputSearch">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={searchHandler}
          value={searchParams.get("q") || ""}
        />
      </div>
      <div className="list">
        <h2 className="fs-3 py-4 title">User List</h2>
        {content}
      </div>
    </div>
  );
}
