import React from "react";
import "./auth.scss";
import { Form, Input, Row } from "antd";
import { ButtonComponent } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE, lOGIN_ROUTE } from "../../constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../redux/slicers/user";


const Signup = () => {
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log(values);
    navigate(lOGIN_ROUTE);
  };
  return (
    <div className="auth-box">
      <div className="login-wrapper">
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            className="in2"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <ButtonComponent text="SignUp" />
        </Form>
        <span className="reg-msg">
          <p>Already have an account?</p> <Link to={lOGIN_ROUTE}>Sign In</Link>
        </span>
      </div>
    </div>
  );
};
export default Signup;
