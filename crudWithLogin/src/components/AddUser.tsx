import React from "react";
import { IUser } from "../interfaces/interfaces";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import { RouteComponentProps } from "react-router";

interface IPropsGlobal {
  token: string;
  users: IUser[];

  addNewUser: (user: IUser) => void;
}

const AddUser: React.FC<IPropsGlobal & RouteComponentProps<any>> = props => {
  const [userValue, setUserValue] = React.useState<string>("");
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [isAdminValue, setIsAdminValue] = React.useState<boolean>(false);
  const [passwordValue, setPasswordValue] = React.useState<string>("");

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

  //Add User
  const addUser = () => {
    fetch("http://localhost:3000/api/users/", {
      method: "POST",
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
          props.addNewUser(us);
          props.history.push("/");
        });
      }
    });
  };

  return (
    <ul className="list-group list-group">
      <li className="list-group-item list-group-item-info text-center">
        <strong>Add User </strong>
        <small>{}</small>
      </li>
      <li className="list-group-item text-center">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder={"user name"}
            onChange={userChange}
            value={userValue}
          />

          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder={"email"}
            onChange={emailChange}
            value={emailValue}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder={"password"}
            value={passwordValue}
            onChange={passwordChange}
          />
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isAdminValue}
              onChange={isAdminChange}
            />
            <label className="form-check-label">Admin</label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline-secondary btn-sm"
          onClick={addUser}
        >
          Add
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  users: state.users,
  token: state.token
});
const mapDispatchToProps = {
  addNewUser: actions.addNewUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
