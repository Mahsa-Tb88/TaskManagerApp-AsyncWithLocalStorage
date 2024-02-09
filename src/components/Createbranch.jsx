import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createBranch, updateBranch } from "../utils/api";
import { UseUserContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Createbranch() {
  const { state, dispatch } = UseUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const selectedBranch = state.branches.find((b) => b.id == params.id);
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { branch: params.id ? selectedBranch.branchName : "" },
  });
  const { errors, isSubmitting } = formState;

  // useEffect(() => {
  //   dispatch({ type: "setPageTitle", payload: "Rename Branch" });
  // }, [params.id]);

  async function onSubmit(data) {
    if (params.id) {
      const result = await updateBranch({
        id: params.id,
        branchName: data.branch,
      });
      if (result.success) {
        dispatch({ type: "createNewBranch", payload: result.body });
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await createBranch({ branchName: data.branch });
      if (result.success) {
        dispatch({ type: "createNewBranch", payload: result.body });
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    }
  }
  return (
    <form className=" w-75 m-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="table">
        <div className="d-flex flex-column justify-content-center align-items-start mb-3">
          <label className="mb-1 label">Branch Name</label>
          <input
            type="text"
            className="input"
            {...register("branch", {
              required: "You must enter a name",
              minLength: {
                value: 3,
                message: "Name must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Name must be 10 Characters at most",
              },
            })}
          />
          <small className="text-primary ">
            * Your branch name must consist of alphabets only, without any
            spaces or other symbols
          </small>
          {errors.name && <p className="errors">{errors.name.message}</p>}
        </div>

        <div>
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              {location.pathname == "/branch/renameBranch/" + `${params.id}`
                ? "Rename Branch"
                : "Create Branch"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
