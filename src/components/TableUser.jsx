import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UseUserContext } from "../context/AppContext";
import noAvatar from "../assets/image/no-avatar.png";
export default function TableUser() {
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

  const user = {};
  // state.editUser.status && users.find((user) => user.id == state.editUser.id);
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      name: "",
      family: "",
      phone: "",
      province: "",
      image: `https://i.pravatar.cc/300?img=`,
      desc: "",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (state.editUser.status) {
      updateUsers(
        user.id,
        data.name,
        data.family,
        data.phone,
        data.province,
        data.image,
        data.desc
      );
      dispatch({
        type: "showInfoOfUser",
        payload: { status: true, id: user.id },
      });
    } else {
      addUsers(
        data.name,
        data.family,
        data.phone,
        listOfProvince.indexOf(data.province),
        data.image,
        data.desc
      );
    }

    const newUsers = getAllUsers();
    dispatch({ type: "addUserSubmit", payload: newUsers });
    toast.success("new user Added  successfully!");
  }
  return (
    <form className="table w-75 m-auto mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <div className="d-flex flex-column justify-content-center align-items-start ">
          <label className="mb-1 label">Name</label>
          <input
            type="text"
            className="input"
            {...register("name", {
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
            {...register("family", {
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
              <option key={province}>{province}</option>
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
          <img src={watch("image")} width="40" className="rounded-circle img" />
        </div>

        <input
          type="text"
          className="w-100 input"
          {...register("image", {
            required: "Select the image",
          })}
        />
        {errors.image && <p className="errors">{errors.image.message}</p>}
      </div>
      <div className="d-flex flex-column justify-content-start align-items-start mb-4">
        <label>Describe</label>
        <textarea
          className="form-control"
          type="text"
          {...register("desc")}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </div>
    </form>
  );
}
