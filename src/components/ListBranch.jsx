import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteBranch, deleteUsersInBranch } from "../utils/api";

export default function ListBranch({ branch }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const { state, dispatch } = UseUserContext();
  function branchHandler(value) {
    navigate(`/branch/${value}`);
    dispatch({ type: "setPageTitle", payload: value });
  }

  async function RemoveBranchHandler(id) {
    if (!confirm("Are you sure?")) {
      return;
    }
    const resultOne = await deleteUsersInBranch(id);
    // console.log(resultOne, resultOne.body);
    navigate("/", { replace: true });

    if (resultOne.success) {
      dispatch({ type: "setUsers", payload: resultOne.body });
      const result = await deleteBranch(id);
      if (result.success) {
        dispatch({ type: "setBranches", payload: result.body });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error(resultOne.message);
    }
  }
  async function RenameBranchHandler(id, branchName) {
    navigate(
      "/branch/renameBranch/" + `${id}` + "?renameBranch=" + `${branchName}`
    );
  }
  const addClass = [
    "linkBranch",
    state.pageTitle == branch.branchName ? "activeBranch" : "",
  ].join(" ");
  return (
    <div className="branchList">
      <div className="btn-branch d-flex justify-content-between align-items-center ">
        <div
          className={addClass}
          onClick={() => branchHandler(branch.branchName)}
        >
          {branch.branchName}
        </div>
        <div className="d-flex flex-column justify-content-between align-items-center ">
          <div
            onClick={() => RenameBranchHandler(branch.id, branch.branchName)}
          >
            <FaEdit className=" editBranch" />
          </div>
          <div onClick={(e) => RemoveBranchHandler(branch.id)}>
            <FaRegTrashAlt className="removeBranch" />
          </div>
        </div>
      </div>
    </div>
  );
}
