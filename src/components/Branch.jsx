import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserItem from "./UserItem";

export default function Branch() {
  const params = useParams();

  useEffect(() => {
    fetchUsers();
  }, []); 
  async function fetchUsers() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getUsers(searchParams.get("q"), params.BranchName);
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
        <button className="btn btn-primary" onClick={fetchUsers}>
          Try again
        </button>
      </div>
    );
  } else if (!state.users.length) {
    content = (
      <p className="bg-primary mt-3 p-2 text-white fs-5">There is no users</p>
    );
  } else {
    content = state.users.map((branch) => (
      <UserItem key={branch.id} branch={branch} />
    ));
  }
  return <div>{content}</div>;
}
