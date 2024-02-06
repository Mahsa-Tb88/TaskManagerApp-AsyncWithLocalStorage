import React from "react";
import {  NavLink } from "react-router-dom";

export default function ListBranch({ branch }) {
  console.log(branch);
  return (
    <div className="branch">
      <div className="linkBranch">
        <NavLink className="link" to={`/branch/${branch.branchName}`}>
          {branch.branchName}
        </NavLink>
      </div>
    </div>
  );
}
// to={"/branch/" + `${branch.id}`}
