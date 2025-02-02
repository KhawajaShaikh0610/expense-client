import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUserExpensesQuery } from "../redux/api/adminApi";

const AdminExpense = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data: expenses, error, isLoading } = useGetUserExpensesQuery(userId);

  if (isLoading) return <p>Loading expenses...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        Error: {error.data?.message || "Failed to load expenses"}
      </p>
    );

  // Calculate total income, total expense, and available cash based on "type"
  const totalIncome =
    expenses
      ?.filter((expense) => expense.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const totalExpense =
    expenses
      ?.filter((expense) => expense.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const totalAvailableCash = totalIncome - totalExpense;

  return (
    <div>
      <h2>User Expenses</h2>

      {/* Summary Section - Only Show When Data Exists */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          border: "1px solid black",
          marginBottom: "10px",
          background: "#f9f9f9",
        }}
      >
        <p>
          <strong>Total Available Cash:</strong> ${totalAvailableCash}
        </p>
        {totalIncome > 0 && (
          <p>
            <strong>Total Income:</strong> ${totalIncome}
          </p>
        )}
        {totalExpense > 0 && (
          <p>
            <strong>Total Expense:</strong> ${totalExpense}
          </p>
        )}
      </div>

      {/* Expense Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense) => (
            <tr key={expense._id}>
              <td>{expense._id}</td>
              <td>${expense.amount}</td>
              <td
                style={{
                  color: expense.type === "income" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {expense.type}
              </td>
              <td>{expense.description}</td>
              <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExpense;
