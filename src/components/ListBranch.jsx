import React from "react";
import { useNavigate } from "react-router-dom";
import { UseUserContext } from "../context/AppContext";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteBranch, deleteUsersInBranch } from "../utils/api";

export default function ListBranch({ branch }) {
  const navigate = useNavigate();
  const { state, dispatch } = UseUserContext();
  function branchHandler(value) {
    navigate(`/branch/${value}`);
    dispatch({ type: "setPageTitle", payload: value });
  }
  async function deleteUserHandler(id) {
    if (!confirm("Are you sure?")) {
      return;
    }
    const result = await deleteUser(id);
    if (result.success) {
      dispatch({ type: "deleteUser", payload: result.body });
      toast.success(result.message);
      navigate("/", { replace: true });
    } else {
      toast.error(result.message);
    }
  }

  async function RemoveBranchHandler(id) {
    if (!confirm("Are you sure?")) {
      return;
    }
    const resultOne = await deleteUsersInBranch(id);
    if (resultOne.success) {
      dispatch({ type: "setUsers", payload: result.body });
      // toast.success(result.message);
      const result = await deleteBranch(id);
      if (result.success) {
        dispatch({ type: "setBranches", payload: result.body });
        toast.success(result.message);
        navigate("/", { replace: true });
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error(result.message);
    }
  }
  function RenameBranchHandler(id) {}
  const addClass = [
    "linkBranch px-2",
    state.pageTitle == branch.branchName ? "activeBranch" : "",
  ].join(" ");
  return (
    <div className="branchList">
      <button
        className={addClass}
        onClick={() => branchHandler(branch.branchName)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>{branch.branchName}</div>
          <div className="d-flex flex-column justify-content-between align-items-center ">
            <button
              className="btnBranch"
              onClick={() => RenameBranchHandler(branch.id)}
            >
              <FaEdit className="my-2 editBranch" />
            </button>
            <button
              className="btnBranch"
              onClick={() => RemoveBranchHandler(branch.id)}
            >
              <FaRegTrashAlt className="my-2 removeBranch" />
            </button>
          </div>
        </div>
      </button>
    </div>
  );
}
