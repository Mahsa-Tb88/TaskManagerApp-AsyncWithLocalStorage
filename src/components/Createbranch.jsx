import React from "react";
import { useForm } from "react-hook-form";

export default function Createbranch() {
  const { register, formState } = useForm({});
  const { errors,isSubmitting } = formState;

  async function handleSubmit(data) {
    const result = await createUser(data);
    if (result.success) {
      dispatch({ type: "createNewBranch", payload: result.body });
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <form className=" w-75 m-auto mt-5" onSubmit={handleSubmit}>
      <div className="table">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="d-flex flex-column justify-content-center align-items-start ">
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
            {errors.name && <p className="errors">{errors.name.message}</p>}
          </div>
        </div>
        <div>
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              create branch
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
