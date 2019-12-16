import React from "react";
import { IUser, IMyUser } from "../interfaces/interfaces";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router";
import * as actions from "../actions/actions";

interface IPropsGlobal {
  users: IUser[];
  token: string;
  myUser: IMyUser;

  editUser: (user_id: string, user: IUser) => void;
}

const EditUser: React.FC<
  IPropsGlobal & RouteComponentProps<{ userId: string }>
> = props => {
  const user = props.users.find(u => u._id === props.match.params.userId);
  const [userValue, setUserValue] = React.useState<string>(
    user ? user.username : ""
  );
  const [emailValue, setEmailValue] = React.useState<string>(
    user ? user.email : ""
  );
  const [isAdminValue, setIsAdminValue] = React.useState<boolean>(
    user ? user.isAdmin : false
  );
  const [passwordValue, setPasswordValue] = React.useState<string>("");

  if (!user) {
    return <Redirect to="/" />;
  }

  const userChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(event.currentTarget.value);
  };

  const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };

  const isAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdminValue(event.currentTarget.checked);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
  };

  const updateUser = (user_id: string, user: IUser) => {
    const id = user._id;
    fetch("http://localhost:3000/api/users/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        username: userValue,
        email: emailValue,
        password: passwordValue,
        isAdmin: isAdminValue
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((us: IUser) => {
          // const userEdit = {
          //   username: userValue,
          //   email: emailValue,
          //   isAdmin: isAdminValue,
          //   _id: id
          // };
          props.editUser(user_id, us);
          props.history.push(`/user/${id}`);
        });
      }
    });
  };

  return (
    <ul className="list-group list-group">
      <li className="list-group-item list-group-item-info text-center">
        <strong>Edit user </strong>
        <small>{}</small>
      </li>
      <li className="list-group-item text-center" key={user._id}>
        <div className="form-group">
          <small>User name</small>
          <input
            type="text"
            className="form-control"
            onChange={userChange}
            value={userValue}
          />
          <small>Email</small>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={emailChange}
            value={emailValue}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        {props.myUser.id === user._id && (
          <div className="form-group">
            <small>Password - not change -</small>
            <input
              type="password"
              className="form-control"
              value={passwordValue}
              onChange={passwordChange}
              readOnly
            />
          </div>
        )}
        {props.myUser.isAdmin && (
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isAdminValue}
              onChange={isAdminChange}
            />
            <label className="form-check-label">Admin</label>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => updateUser(user._id, user)}
        >
          Update
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  token: state.token,
  myUser: state.myUser
});

const mapDispatchToProps = {
  editUser: actions.editUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
