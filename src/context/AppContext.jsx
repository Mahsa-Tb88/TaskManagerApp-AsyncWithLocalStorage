import { createContext, useContext, useEffect, useReducer } from "react";
import { userReducer } from "./AppReducer";
import { getUsers } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const userContext = createContext();

function UseContextProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchUsers() {
    dispatch({ type: "setIsMultiLoading", payload: true });
    const result = await getUsers(searchParams.get("q"));
    if (result.success) {
      dispatch({ type: "setUsers", payload: result.body });
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
  const [state, dispatch] = useReducer(userReducer, {
    pageTitle: "Home",
    users: [],
    isSingleLoading: false,
    singleLoadingError: false,
    isMultiLoading: true,
    multiLoadingError: false,
    fetchUsers,
  });

  useEffect(() => {
    const timeOut = setTimeout(fetchUsers, 20);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
}

function UseUserContext() {
  return useContext(userContext);
}

export { UseUserContext, UseContextProvider };
