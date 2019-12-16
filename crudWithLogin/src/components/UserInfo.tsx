import React from "react";
import { IUser, IMyUser } from "../interfaces/interfaces";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as actions from "../actions/actions";

interface IPropsGlobal {
  users: IUser[];
  myUser: IMyUser;
  token: string;
  removeUser: (user_id: string) => void;
}

const UserInfo: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const user = props.users.find(u => u._id === props.match.params.userId);
  if (!user) {
    return <Redirect to="/" />;
  }

  // DELETE USER
  const deleteUser = (user_id: string) => {
    const id = user._id;
    if (props.myUser.isAdmin) {
      fetch("http://localhost:3000/api/users/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }).then(resp => {
        if (resp.ok) {
          props.removeUser(user_id, );
          props.history.push("/");
        }
      });
    }
  };

  return (
    <ul className="list-group list-group">
      <li className="list-group-item list-group-item-info text-center">
        <strong>USER INFO</strong>
      </li>

      <li className="list-group-item text-center">
        <strong>{user.username}</strong>
        {props.myUser.isAdmin && (
          <p>
            <small>{user._id}</small>
          </p>
        )}
      </li>
      <li className="list-group-item text-center">{user.email}</li>
      <li className="list-group-item text-center">
        <div>
          <Link
            to={"/user/edit/" + user._id}
            className="btn btn-outline-secondary btn-sm"
          >
            Edit
          </Link>

          {props.myUser.isAdmin && (
            <input
              type="button"
              className="btn btn-outline-secondary btn-sm"
              value="Delete"
              onClick={() => deleteUser(user._id)}
            />
          )}
        </div>
      </li>
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  myUser: state.myUser,
  token: state.token
});
const mapDispatchToProps = {
  removeUser: actions.removeUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
