// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useLoginMutation } from "../redux/api/authApi";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/slice/authSlice";
// import { Col, Container } from "react-bootstrap";

// const Login = () => {
//   const [login] = useLoginMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string().required("Required"),
//     }),
//     onSubmit: async (user) => {
//       try {
//         const data = await login(user).unwrap();
//         // if (!data?.user || !data?.token) {
//         //   throw new Error("Invalid API response");
//         // }
//         console.log(data);
//         dispatch(setUser({ user: data.user, token: data.token }));
//         localStorage.setItem("user", JSON.stringify(data));
//         console.log("Processed User Data:", data);
//         navigate("/tracker");
//       } catch (error) {
//         console.error("Login Error:", error);
//         alert(error.data?.message || "Login failed");
//       }
//     },
//   });

//   return (
//     <div className="">
//       <div className="flex items-center justify-center h-full">
//         <div className="flex flex-col items-center justify-center">
//           <Container className="container-div ">
//             <form onSubmit={formik.handleSubmit} className="">
//               <h1>Login</h1>
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
//               <div
//                 className="my-1 cursor-pointer hover:text-blue-400"
//                 onClick={() => navigate("/register")}
//               >
//                 Sign Up
//               </div>
//               <Col>
//                 <button type="submit" className="primary-btn">
//                   Login
//                 </button>
//               </Col>
//             </form>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
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
    const [showPassword, setShowPassword] = useState(false);
  

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 m-auto w-full">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-lg p-8">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Login</h1>
          <Col className="mb-4">
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
          </Col>
          <Col className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          </Col>
          <div className="text-sm text-left ml-2 text-gray-600 mb-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Sign up
            </span>
          </div>
          <Col>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
          </Col>
        </form>
      </div>
    </div>
  );
};

export default Login;

