import React from "react";
import Navbar from "../components/Navbar";
import UsersList from "../components/UsersList";
import { Route, Switch, Redirect } from "react-router";
import UserInfo from "../components/UserInfo";
import EditUser from "../components/EditUser";
import AddUser from "../components/AddUser";

const LayoutPage: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 p-3">
          <Navbar />
        </div>
      </div>
      <div className="row m-3">
        <div className="col-4  p-2">
          <UsersList />
        </div>
        <div className="col-5 p-2 text-center">
          <Switch>
            <Route path="/user/add/" exact component={AddUser} />
            <Route path="/user/:userId" exact component={UserInfo} />
            <Route path="/user/edit/:userId" exact component={EditUser} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
