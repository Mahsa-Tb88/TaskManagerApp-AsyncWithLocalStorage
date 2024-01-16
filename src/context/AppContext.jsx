import { createContext, useContext, useReducer } from "react";
import { userReducer } from "./AppReducer";

const userContext = createContext();

function UseContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { user: [] });
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
