import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { UseUserContext } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import { getAllBranches, getBranches, getUsers } from "../utils/api";
import ListBranch from "./ListBranch";

export default function UserList() {
  const { state, dispatch } = UseUserContext();
  const [searchParams, setSearchParams] = useSearchParams();


  async function fetchBranches() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getBranches(searchParams.get("q"));
    console.log(result);
    if (result.success) {
      dispatch({ type: "setBranches", payload: result.body });
    } else {
      dispatch({
        type: "setMultiLoadingError",
        payload: {
          message: result.message,
          code: result.code,
        },
      });
    }
    dispatch({ type: "setIsMultiLoading", payload: false });
  }
  function searchHandler(e) {
    if (e.target.value) {
      setSearchParams({ q: e.target.value });
    } else {
      setSearchParams({});
    }
  }

  let content = "";
  if (state.isMultiLoading) {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span>on loading...</span>
        <span className="spinner-grow text-primary"></span>
      </div>
    );
  } else if (state.multiLoadingError) {
    content = (
      <div>
        <span>{state.multiLoadingError.message}</span>
        <button className="btn btn-primary" onClick={fetchBranches}>
          Try again
        </button>
      </div>
    );
  } else if (!state.branches.length) {
    content = (
      <p className="bg-primary mt-3 p-2 text-white fs-5 rounded-1">
        There is no branches
      </p>
    );
  } else {
    content = state.branches.map((branch) => (
      <ListBranch key={branch.id} branch={branch} />
    ));
  }

  return (
    <div className="w-25 text-center py-4 px-3 userList">
      <div className="inputSearch">
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={searchHandler}
          value={searchParams.get("q") || ""}
        />
      </div>
      <div className="list">
        <h2 className="fs-3 py-4 title">Branch List</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {content}
        </div>
      </div>
    </div>
  );
}
