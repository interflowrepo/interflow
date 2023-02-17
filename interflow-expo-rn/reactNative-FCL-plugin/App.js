import React from "react";
import "./flow/config.js";
import FclContext from "./contexts/FclContext";
import HomeComponent from "./components/HomeComponent";

export default function App() {
  return (
    <FclContext>
      <HomeComponent />
    </FclContext>
  );
}
