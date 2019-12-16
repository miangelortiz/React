import React from "react";
import { IMyUser } from "../interfaces/interfaces";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  setToken: (token: string) => void;
  myUser: IMyUser;
}

const Navbar: React.FC<IPropsGlobal> = props => {
  //LogOut, borra el Token del localStorage y del store
  const logOut = () => {
    localStorage.removeItem("token");
    props.setToken("");
  };

  return (
    <ul className="nav justify-content-left p-4">
      <li className="nav-item p-1">
        <Link
          to={"/user/" + props.myUser.id}
          className="btn btn-outline-info"
          data-toggle="tooltip"
          data-placement="bottom"
          title="My profile"
        >
          {props.myUser.username}
        </Link>
      </li>
      <li className="nav-item p-1">
        <Link
          to={"/"}
          className="btn btn-outline-info"
          data-toggle="tooltip"
          data-placement="bottom"
          title="bye, bye"
          onClick={logOut}
        >
          Log out
        </Link>
      </li>
      {props.myUser.isAdmin && (
        <li className="nav-item p-1">
          <Link
            to={"/user/add/"}
            className="btn btn-outline-info"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Add user"
          >
            Add user
          </Link>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  myUser: state.myUser
});

const mapDispatchToProps = {
  setToken: actions.setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
