import React, { useState } from "react";
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
} from "../redux/api/transactionApi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../components/FormController/Header";

const ExpenseTracker = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log(loggedInUser);
  const { data: transactions = [] } = useGetTransactionsQuery(
    loggedInUser?.user?.id
  );

  console.log(transactions);

  const [addTransaction] = useAddTransactionMutation();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await addTransaction({
        ...formData,
        userId: loggedInUser?.user?.id,
        amount: Number(formData.amount),
      }).unwrap();
      console.log("response", response);
      alert("Expense added successfully");
      window.location.reload();
      // setFormData({ description: "", amount: "", type: "income" });
    } catch (error) {
      alert(error.data?.message || "Failed to add transaction");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Tracker - Transactions History", 14, 20);

    const tableData = transactions.map((transaction, index) => [
      index + 1,
      transaction.description,
      transaction.type,
      `$${transaction.amount}`,
      new Date(transaction.createdAt).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [["#", "Description", "Type", "Amount", "Date"]],
      body: tableData,
    });

    doc.save("ExpenseHistory.pdf");
  };

  const calculateTotal = (type) => {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((sum, item) => sum + item.amount, 0);
  };

  console.log(calculateTotal("income"));

  return (
    <div>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <h1>Expense Tracker</h1>
          <div>
            <h3>Total Income: ${calculateTotal("income")}</h3>
            <h3>Total Expense: ${calculateTotal("expense")}</h3>
            <h3>
              Net Balance: $
              {calculateTotal("income") - calculateTotal("expense")}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button type="submit">Add Transaction</button>
          </form>

          <button onClick={generatePDF}>Export as PDF</button>

          <h2>Transaction History</h2>
          <table border="1">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.type}</td>
                  <td>${transaction.amount}</td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
