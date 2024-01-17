export function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setIsMultiLoading":
      return { ...state, isMultiLoading: payload };

    case "setUsers":
      return { ...state, users: payload, isMultiLoading: false };
    case "setMultiLoadingError":
      return { ...state, multiLoadingError: payload };
    case "addUser":
      return {
        ...state,
        singleLoadingError: payload,
        pageTitle: "Create New User",
      };
    case "backToHome":
      return { ...state, singleLoadingError: payload, pageTitle: "Home" };
    case "setIsSingleLoading":
      return { ...state, isSingleLoading: payload };
    case "setSingleLoadingError":
      return { ...state, singleLoadingError: payload };
    case "showInfo":
      return { ...state, pageTitle: payload };
  }
  throw new Error("Invalid Action");
}
