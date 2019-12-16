import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "@testing-library/react/cleanup-after-each";
// import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";
import LoginPage from "./layouts/LoginPage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducers } from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(reducers, devToolsEnhancer({}));

it("No funciona el boton del login si no hay password", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  const password_input = getByTestId("password_input");
  fireEvent.change(password_input, { target: { value: "" } });
});

it("Input del user login tiene como texto en placeholder 'usuario'", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  const user_input = getByTestId("user_input");
  expect(user_input.getAttribute("placeholder")).toBe("usdsdsd")
});
