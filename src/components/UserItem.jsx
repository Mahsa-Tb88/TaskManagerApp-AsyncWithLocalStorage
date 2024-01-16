import React from "react";
// import { useUsersContext } from "../Context/UsersContext";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import noAvatar from "../assets/image/no-avatar.png";
export default function User({ user }) {
//   const { state, dispatch } = useUsersContext();

  const userClass = [
    "d-flex justify-content-start align-items-center user mb-3 py-2 ",
  ].join(" ");
  function selectUser(id) {
    // dispatch({ type: "showInfoOfUser", payload: { status: true, id } });
  }
  return (
    <NavLink
      to={`/user/${user.id}`}
      className={userClass}
      onClick={() => selectUser(user.id)}
    >
      <div className="w-25">
        <img className="w-50 rounded-circle" src={user.avatarURL || noAvatar} />
      </div>
      <div>
        <span className="name">{user.firstname} </span>
        <span className="family">{user.lastname}</span>
      </div>
    </NavLink>
  );
}
