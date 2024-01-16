export function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "AddUser":
      return payload;
  }
}
