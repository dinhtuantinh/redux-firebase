import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { registerInit } from "../redux/actions/actions";
import "./css/Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { currentUser } = useSelector((state) => state.user);

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/home");
      toast.success("Thêm tài khoản thành công")
    }
  }, [currentUser, history]);

  const dispatch = useDispatch();

  const { email, password, displayName, passwordConfirm } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Mật khẩu chưa trùng khớp!")
      return;
    }
    dispatch(registerInit(email, password, displayName));
    setState({ email: "", displayName: "", password: "", passwordConfirm: "" });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div id="register-form">
        <form className="form-signup" onSubmit={handleSubmit}>
          <h1
            className="h3 mb-3 font-weight-normal"
            style={{ textAlign: "center" }}
          >
            Đăng ký
          </h1>
          <input
            type="text"
            id="displayName"
            className="form-control"
            placeholder="Tên"
            name="displayName"
            onChange={handleChange}
            value={displayName}
            required
          />
          <input
            type="email"
            id="user-email"
            className="form-control"
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
            placeholder="Password tối thiểu 8 ký tự"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          
          <input
            type="password"
            id="passwordConfirm"
            className="form-control"
            placeholder="Nhập lại Password"
            name="passwordConfirm"
            onChange={handleChange}
            value={passwordConfirm}
            required
          />
          <button className="btn btn-primary btn-block" type="submit">
            <i className="fas fa-user-plus"></i> Thêm tài khoản
          </button>
          <Link to="/login">
            <i className="fas fa-angle-left"></i> Quay lại
          </Link>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Register;
