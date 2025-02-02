import React from "react";
import { useGetUsersQuery } from "../redux/api/adminApi";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        Error: {error.data?.message || "Failed to load users"}
      </p>
    );

  const handleCheckExpense = (userId) => {
    navigate(`/admin/expense?userId=${userId}`);
  };

  return (
    <div>
      <h2>All Registered Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Check Expense</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleCheckExpense(user._id)}>
                  Expense
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
