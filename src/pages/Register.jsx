import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../redux/api/authApi";
import { Col, Container, Row } from "react-bootstrap";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await register(values).unwrap();
        navigate("/");
      } catch (error) {
        alert(error.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <Container className="container-div ">
            <form onSubmit={formik.handleSubmit}>
              <h1>Register</h1>
              <Col>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input-text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="error-text">{formik.errors.name}</p>
                )}
              </Col>
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
              <Row>
                <Col md={6}>
                  <button type="submit" className="primary-btn">
                    Register
                  </button>
                </Col>
                <Col md={6}>
                  <button
                    type="submit"
                    className="primary-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Register;
