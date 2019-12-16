import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import jwt from "jsonwebtoken";
import { IMyUser } from "../interfaces/interfaces";

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setMyUser: (myUser: IMyUser) => void;
}

const Login: React.FC<IProps & IPropsGlobal> = props => {
  const [userValue, setUserValue] = React.useState<string>("");
  const [passValue, setPassValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const userChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(event.currentTarget.value);
    setError("");
  };

  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassValue(event.currentTarget.value);
    setError("");
  };

  //Llamada a la api para obtener un token cuando nos logueamos
  const getToken = () => {
    if (userValue !== "" && passValue !== "") {
      fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: userValue,
          password: passValue
        })
      }).then(response => {
        if (response.ok) {
          response.text().then(token => {
            //Guardo el token en el LocalStorage
            localStorage.setItem("token", token);
            props.setToken(token);
            //Con jsonwebtoken (jwt) guardo un objeto con los valores del token
            const decoded = jwt.decode(token);
            if (decoded !== null && typeof decoded !== "string") {
              props.setMyUser(decoded);
            }
          });
        } else {
          setError("Usuario o Password incorrecta");
        }
      });
    } else {
      setError("Debe introducir todos los datos");
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-3">
          <div className="row">
            <div className="col text-center">
              <h3>Login for CRUD</h3>
            </div>
          </div>
          <div className="form row m-3 border border-info">
            <div className="col m-4 p-3">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-8 m-4">
                    <div className="form-group">
                      <input
                        data-testid="user_input"
                        type="text"
                        value={userValue}
                        placeholder="usuario"
                        className="form-control"
                        onChange={userChange}
                      />
                      <br />
                      <input
                        data-testid="password_input"
                        type="password"
                        value={passValue}
                        placeholder="password"
                        className="form-control"
                        onChange={passChange}
                      />
                    </div>
                    <input
                      type="button"
                      className="btn btn-info"
                      value="Entrar"
                      onClick={getToken}
                    />
                    <div>
                      <strong>{error}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken,
  setMyUser: actions.setMyUser
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
