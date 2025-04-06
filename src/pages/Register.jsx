// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useRegisterMutation } from "../redux/api/authApi";
// import { Col, Container, Row } from "react-bootstrap";

// const Register = () => {
//   const [register] = useRegisterMutation();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Required"),
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string()
//         .min(6, "Minimum 6 characters")
//         .required("Required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await register(values).unwrap();
//         navigate("/");
//       } catch (error) {
//         alert(error.data?.message || "Registration failed");
//       }
//     },
//   });

//   return (
//     <div>
//       <div className="flex items-center justify-center h-full">
//         <div className="flex flex-col items-center justify-center">
//           <Container className="container-div p-6">
//             <form onSubmit={formik.handleSubmit}>
//               <h1>Register</h1>
//               <Col>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   className="input-text"
//                   value={formik.values.name}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.name && formik.errors.name && (
//                   <p className="error-text">{formik.errors.name}</p>
//                 )}
//               </Col>
//               <Col>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className="input-text"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="error-text">{formik.errors.email}</p>
//                 )}
//               </Col>
//               <Col>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="input-text"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <p className="error-text">{formik.errors.password}</p>
//                 )}
//               </Col>
//               <Row>
//                 <Col md={6}>
//                   <button type="submit" className="primary-btn">
//                     Register
//                   </button>
//                 </Col>
//                 <Col md={6}>
//                   <button
//                     type="submit"
//                     className="primary-btn"
//                     onClick={() => navigate("/login")}
//                   >
//                     Login
//                   </button>
//                 </Col>
//               </Row>
//             </form>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../redux/api/authApi";
import { Col, Container, Row } from "react-bootstrap";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
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
    <div className="min-h-screen w-full flex items-center justify-center m-auto px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-600 mt-1 ml-2">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600 mt-1 ml-2">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="absolute right-3 top-2 text-[18px]  text-blue-600 cursor-pointer select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🔓" : "🔒"}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-600 mt-1 ml-2">{formik.errors.password}</p>
            )}
          </div>
          {/* <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
          </div> */}
          <div className="text-sm text-left ml-2 text-gray-600 mb-4">
          Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Sign in
            </span>
          </div>
          <Col>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                      >
              Register
              </button>
                    </Col>
        </form>
      </div>
    </div>
  );
};

export default Register;
