import React from "react";
import { NavLink } from "react-router-dom";
import noAvatar from "../assets/image/no-avatar.png";
export default function User({ user }) {
  function userInfoHandler(id) {
    navigate(`/user/${id}`);
  }

  return (
    <div>
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
