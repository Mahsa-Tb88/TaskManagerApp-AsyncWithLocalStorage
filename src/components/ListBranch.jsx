import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";

export default function ListBranch({ branch }) {
  const navigate = useNavigate();
  const { state, dispatch } = UseUserContext();
  function branchHandler(value) {
    navigate(`/branch/${value}`);
    dispatch({ type: "setPageTitle", payload: value });
  }
  const addClass = [
    "linkBranch",
    state.pageTitle == branch.branchName ? "activeBranch" : "",
  ].join(" ");
  return (
    <div className="branchList">
      <button
        className={addClass}
        onClick={() => branchHandler(branch.branchName)}
      >
        {branch.branchName}
      </button>
    </div>
  );
}
// to={"/branch/" + `${branch.id}`}
