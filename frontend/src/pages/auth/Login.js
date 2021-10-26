import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      axios
        .post(`http://localhost:8001/api/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          const { data } = res;
          localStorage.setItem("email", JSON.stringify(data[0].email));
          history.push("/home");
        })
        .catch((err) => {
          toast.error("invalid credentials");
        });
    } else {
      toast.error("all fields are required");
    }
  };

  return (
    <>
      <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" action="" method="post">
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">
                      Email:
                    </label>
                    <br />
                    <input
                      type="email"
                      name="username"
                      id="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
                      onClick={loginUser}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
