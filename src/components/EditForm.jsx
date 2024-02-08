import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import noAvatar from "../assets/image/no-avatar.png";
import { UseUserContext } from "../context/AppContext";

export default function EditForm({ onSubmit, type, user }) {
  const { state, dispatch } = UseUserContext();
  const listOfProvince = [
    "British Columbia",
    "Alberta",
    "Manitoba",
    "New Brunswick",
    "Nova Scotia",
    "Ontario",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ];
  const params = useParams();
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      phone: user ? user.phone : "",
      avatarURL: user ? user.avatarURL : "https://i.pravatar.cc/300?img=",
      province: user ? user.province : 1,
      branch: user ? user.branch : 1,
      description: user ? user.description : "",
    },
  });
  const { errors, isSubmitting } = formState;
  return (
    <form className=" w-75 m-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="table">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Name</label>
            <input
              type="text"
              className="input"
              {...register("firstname", {
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
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Family</label>
            <input
              type="text"
              className="input"
              {...register("lastname", {
                required: "You must enter a family",
                minLength: {
                  value: 3,
                  message: "Family must be 3 Characters at least",
                },
                maxLength: {
                  value: 10,
                  message: "Family must be 10 Characters at most",
                },
              })}
            />
            {errors.family && <p className="errors">{errors.family.message}</p>}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Phone</label>
            <input
              type="text"
              className="input"
              {...register("phone", {
                required: "You must enter a Phone number",
                minLength: {
                  value: 12,
                  message: "It is short, Phone number must be 12 number",
                },
                maxLength: {
                  value: 12,
                  message: "It is long, Phone number must be 12 number",
                },
              })}
            />
            {errors.phone && <p className="errors">{errors.phone.message}</p>}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <label className="mb-1 label">Province</label>
            <select
              className="input"
              {...register("province", {
                required: "Select the province",
              })}
            >
              {listOfProvince.map((province) => (
                <option key={province} value={listOfProvince.indexOf(province)}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="errors">{errors.province.message}</p>
            )}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start mb-4">
          <div className="d-flex  justify-content-center align-items-center">
            <label className="mb-1 label">Address of Image</label>
            <img
              src={
                params.id
                  ? watch("avatarURL")
                  : watch("avatarURL") == "https://i.pravatar.cc/300?img="
                  ? noAvatar
                  : watch("avatarURL")
              }
              width="40"
              className="rounded-circle img"
            />
          </div>

          <input
            type="text"
            className="w-100 input"
            {...register("avatarURL", {
              required: "Select the image",
            })}
          />
          {errors.avatarURL && (
            <p className="errors">{errors.avatarURL.message}</p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-3">
          <label className="mb-1 label">Branch</label>
          <select
            className="input"
            {...register("branch", {
              required: "Select the province",
            })}
          >
            {state.branches.map((branch) => (
              <option key={branch.id} value={state.branches.indexOf[branch]}>
                {branch.branchName}
              </option>
            ))}
          </select>
          {errors.branch && <p className="errors">{errors.branch.message}</p>}
        </div>

        <div className="d-flex flex-column justify-content-start align-items-start mb-4">
          <label>Describe</label>
          <textarea
            className="form-control"
            type="text"
            {...register("description")}
          ></textarea>
        </div>
        <div>
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              {type == "new" ? "Create User" : "EditUser"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

//
