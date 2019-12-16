import React, { useEffect } from "react";
import { IMyUser, IUser } from "../interfaces/interfaces";
import * as actions from "../actions/actions";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

const UsersList: React.FC<IPropsGlobal> = props => {
  const getUsers = () => {
    fetch("http://localhost:3000/api/users", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(users => {
          props.setUsers(users);
        });
      }
    });
  };

  useEffect(getUsers, [props.token]);

  return (
    <ul className="list-group list-group">
      <li className="list-group-item list-group-item-info text-center">
        <strong>USERS LIST</strong>
      </li>

      {props.users
        .filter(user => user._id !== props.myUser.id)
        .map(user => (
          <li className="list-group-item text-center" key={user._id}>
            <strong>{user.username}</strong>
            {props.myUser.isAdmin && (
             <div>
               <span> {user.email}</span>
               <br/>
               <Link to={"/user/"+ user._id} className="btn btn-outline-secondary btn-sm">
            info
            </Link></div> 
            
            
            )}
          </li>
        ))}
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  myUser: state.myUser,
  users: state.users
});

const mapDispatchToProps = {
  setUsers: actions.setUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
