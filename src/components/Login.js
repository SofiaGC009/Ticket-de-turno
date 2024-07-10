import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useLogin from "../hooks/useLogin";
import config from "../config/config";

const Login = () => {
  const {
    user,
    setUser,
    password,
    setPassword,
    handleLogin,
    handleCaptchaChange
  } = useLogin();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Username:</span>
            <input
              type="text"
              className="form-control"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Password:</span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <ReCAPTCHA
            sitekey={config.siteKey}
            onChange={handleCaptchaChange}
          />
          <button className="btn btn-primary mt-3" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
