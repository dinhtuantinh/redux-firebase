import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  googleSignInInit,
  loginInit,
} from "../redux/actions/actions";
import "./css/Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const { currentUser } = useSelector((state) => state.user);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/home");
      toast.success("Đăng nhập thành công")
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    dispatch(googleSignInInit());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginInit(email, password));
    setState({ email: "", password: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center" }}
          >
            Đăng nhập
          </h1>
          <input
            type="email"
            id="inputEmail"
            className="form-control input-email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <p style={{ textAlign: "center" }}></p>
          <button className="btn btn-success btn-block btn-login" type="submit">
            <i className="fas fa-sign-in-alt"></i> Đăng nhập
          </button>
          <div className="social-login">
            <button
              className="btn google-btn social-btn"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <span>
                <i className="fab fa-google-plus-g"></i> Đăng nhập Google+
              </span>
            </button>
          </div>
          <hr />
          <p>Bạn chưa có tài khoản?</p>
          <Link to="/register">
            <button
              className="btn btn-primary btn-block"
              type="button"
              id="btn-signup"
            >
              <i className="fas fa-user-plus"></i> Đăng ký tài khoản
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
