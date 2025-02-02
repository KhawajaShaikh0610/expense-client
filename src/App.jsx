import "./App.css";
import styled from "styled-components";
import bg from "./img/bg.jpg";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpenseTracker from "./pages/ExpenseTracker";
import "./styles/scss/index.scss";
import AllExpenses from "./pages/AllExpenses";
import Header from "./components/FormController/Header";
import AdminLogin from "./pages/AdminLogin";
import AllUsers from "./pages/AllUsers";
import AdminExpense from "./pages/AdminExpense";

// AdminPrivateRoute

const AdminPrivateRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin/login" />;
};

const PrivateRoute = ({ children }) => {
  const adminToken = localStorage.getItem("user");
  return adminToken ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AppStyled bg={bg} className="App">
      {/* <Orb /> */}
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* user routes */}

          <Route
            path="/tracker"
            element={
              <PrivateRoute>
                <ExpenseTracker />{" "}
              </PrivateRoute>
            }
          />

          {/* admin routes */}
          <Route
            path="/admin/all-expenses"
            element={
              <AdminPrivateRoute>
                <AllExpenses />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/all-users"
            element={
              <AdminPrivateRoute>
                <AllUsers />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/expense"
            element={
              <AdminPrivateRoute>
                <AdminExpense />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: #fff7dd;
`;

export default App;
