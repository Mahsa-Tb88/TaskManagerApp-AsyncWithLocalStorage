import React, { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    document.title = "User Manager App";
  }, []);
  return (
    <div className="text-center mt-5">
      <h1>Welcome to User Manager App</h1>
      <p className="mt-5">Use Above Button For Adding User</p>
      <p>Use Left Menu For Observing and Editing User</p>
    </div>
  );
}
