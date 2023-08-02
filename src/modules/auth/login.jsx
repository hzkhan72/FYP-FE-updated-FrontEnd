import React from "react";
import "./auth.scss";
import { Form, Input, Row } from "antd";
import { ButtonComponent } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, HOME_ROUTE, SIGN_UP_ROUTE } from "../../constants";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../redux/slicers/user";

const Login = () => {
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(userLoginRequest());
    navigate(HOME_ROUTE);
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
          <ButtonComponent text="Login" />
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
