import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/authSlice";
import { Col, Container } from "react-bootstrap";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (user) => {
      try {
        const data = await login(user).unwrap();
        // if (!data?.user || !data?.token) {
        //   throw new Error("Invalid API response");
        // }
        console.log(data);
        dispatch(setUser({ user: data.user, token: data.token }));
        localStorage.setItem("user", JSON.stringify(data));
        console.log("Processed User Data:", data);
        navigate("/tracker");
      } catch (error) {
        console.error("Login Error:", error);
        alert(error.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <Container className="container-div ">
            <form onSubmit={formik.handleSubmit} className="">
              <h1>Login</h1>
              <Col>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-text">{formik.errors.email}</p>
                )}
              </Col>
              <Col>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-text"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="error-text">{formik.errors.password}</p>
                )}
              </Col>
              <div
                className="my-1 cursor-pointer hover:text-blue-400"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </div>
              <Col>
                <button type="submit" className="primary-btn">
                  Login
                </button>
              </Col>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
