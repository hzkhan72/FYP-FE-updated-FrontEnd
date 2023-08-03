import React, { useState } from "react";
import "./auth.scss";
import { Form, Input, Row } from "antd";
import { ButtonComponent } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import {
  ALERT_TYPES,
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  SIGN_UP_ROUTE,
} from "../../constants";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../redux/slicers/user";
import { toastAlert } from "../../services/utils";

const Login = () => {
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    var FinalURL = `http://127.0.0.1:5000/signin?Email=${
      values.email
    }&password=${encodeURIComponent(values.password)}`;
    fetch(FinalURL)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toastAlert(result.message, ALERT_TYPES.success);
          dispatch(userLoginRequest());
          navigate(DASHBOARD_ROUTE);
          return;
        }
        toastAlert(result.message, ALERT_TYPES.error);
        setLoading(false);
      });
  };
  return (
    <div className="auth-box">
      <div className="login-wrapper">
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item
            name={"email"}
            rules={[
              {
                type: "email",
                message: "The input is not valid Email!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <ButtonComponent
            text="Login"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </Form>
        <span className="reg-msg">
          <p>Don't have an account?</p>{" "}
          <Link to={SIGN_UP_ROUTE}>Register now!</Link>
        </span>
      </div>
    </div>
  );
};
export default Login;
