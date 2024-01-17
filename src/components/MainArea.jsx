import React, { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { UseUserContext } from "../context/AppContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
export default function MainArea() {
  const { state, dispatch } = UseUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/newUser") {
      state.pageTitle = "Create New User";
      state.singleLoadingError = true;
    }
  }, []);
  function addUserHandler() {
    if (state.pageTitle == "Home") {
      dispatch({ type: "addUser", payload: true });
    } else if (state.pageTitle == "Create New User") {
      dispatch({ type: "backToHome", payload: false });
      navigate("/");
    } else if (state.pageTitle == "Info User") {
      dispatch({ type: "backToHome", payload: false });

      navigate("/");
    }
  }

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center header">
        <div className="btn-group fs-6 d-flex justify-content-between align-items-center">
          {state.pageTitle != "Home" ? (
            <button
              className="btnAdd text-white"
              onClick={() => addUserHandler()}
            >
              Back
            </button>
          ) : (
            <Link
              className="btnAdd text-white"
              to="/newUser"
              onClick={() => addUserHandler()}
            >
              Add User
            </Link>
          )}

          {state.pageTitle != "Home" ? <HiArrowUturnLeft /> : <FaUserPlus />}
        </div>
        <h2 className="fs-4">{state.pageTitle}</h2>
      </header>
    </div>
  );
}
