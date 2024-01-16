import React from "react";
import UserItem from "./UserItem";
import { UseUserContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";

export default function UserList() {
  const { state, dispatch } = UseUserContext();
  console.log(state.users);
  const [searchParams, setSearchParams] = useSearchParams();
  function searchHandler(e) {
    // const users = getAllUsers();
    // const filteredUsers = users.filter(
    //   (user) =>
    //     user.firstname.toLowerCase().includes(searchValue) ||
    //     user.lastname.toLowerCase().includes(searchValue)
    // );
    // dispatch({
    //   type: "search",
    //   payload: { users: filteredUsers, search: searchValue },
    // });
    if (e.target.value) {
      setSearchParams({ q: e.target.value });
    } else {
      setSearchParams({});
    }
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
        {/*state.users.length == 0 && (
          <p className="bg-primary mt-3 p-2 text-white fs-5">
            There is no users
          </p>
        )*/}
        {state.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
