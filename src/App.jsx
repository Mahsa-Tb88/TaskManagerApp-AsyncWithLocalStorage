import React from "react";
import MainArea from "./components/MainArea";
import SideBar from "./components/SideBar";
import { UseContextProvider } from "./context/AppContext";

export default function App() {
  return (
    <UseContextProvider>
      <div className="app d-flex justify-content-between align-items-baseline">
        <MainArea />
        <SideBar />
      </div>
    </UseContextProvider>
  );
}
