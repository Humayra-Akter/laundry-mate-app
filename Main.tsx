// Main.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Slot } from "expo-router";

const Main = () => {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
};

export default Main;
