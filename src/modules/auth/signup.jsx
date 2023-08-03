import React, { useState } from "react";
import "./auth.scss";
import { Form, Input, Row } from "antd";
import { ButtonComponent } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ALERT_TYPES, DASHBOARD_ROUTE, lOGIN_ROUTE } from "../../constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLoginRequest } from "../../redux/slicers/user";
import { method } from "lodash";
import { toastAlert } from "../../services/utils";

const Signup = () => {
  const { form } = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    var FinalURL = `http://127.0.0.1:5000/signup?Fname=${values.fName}&Lname=${
      values.lName
    }&Email=${values.email}&password=${encodeURIComponent(values.password)}`;
    fetch(FinalURL)
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toastAlert(result.message, ALERT_TYPES.success);
          navigate(lOGIN_ROUTE);
          return;
        }
        toastAlert(result.message, ALERT_TYPES.error);
        setLoading(false);
      });

    // axios
    //   .post(`http://127.0.0.1:5000/signup`, {
    //     Fname: values.fName,
    //     Lname: values.lName,
    //     Email: values.email,
    //     password: values.password,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div className="auth-box">
      <div className="login-wrapper">
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <Form.Item
            name="fName"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lName"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input placeholder="Last Name" />
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
          <ButtonComponent
            text="SignUp"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </Form>
        <span className="reg-msg">
          <p>Already have an account?</p> <Link to={lOGIN_ROUTE}>Sign In</Link>
        </span>
      </div>
    </div>
  );
};
export default Signup;
