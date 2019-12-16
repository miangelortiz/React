import React from "react";
import LoginPage from "./layouts/LoginPage";
import { connect } from "react-redux";
import { IGlobalState } from "./reducers/reducers";
import { BrowserRouter } from "react-router-dom";
import LayoutPage from "./layouts/LayoutPage";

interface IPropsGlobal {
  token: string;
}

const App: React.FC<IPropsGlobal> = props => {
  return (
    <BrowserRouter>
      {!props.token && <LoginPage />}
      {props.token && <LayoutPage />}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

export default connect(mapStateToProps)(App);
