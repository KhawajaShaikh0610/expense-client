// import React, { useState } from "react";
// import {
//   useAddTransactionMutation,
//   useGetTransactionsQuery,
// } from "../redux/api/transactionApi";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import Header from "../components/FormController/Header";

// const ExpenseTracker = () => {
//   const loggedInUser = JSON.parse(localStorage.getItem("user"));
//   console.log(loggedInUser);
//   const { data: transactions = [] } = useGetTransactionsQuery(
//     loggedInUser?.user?.id
//   );

//   console.log(transactions);

//   const [addTransaction] = useAddTransactionMutation();

//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "",
//     type: "income",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.description || !formData.amount) {
//       alert("Please fill all fields");
//       return;
//     }
//     try {
//       const response = await addTransaction({
//         ...formData,
//         userId: loggedInUser?.user?.id,
//         amount: Number(formData.amount),
//       }).unwrap();
//       console.log("response", response);
//       alert("Expense added successfully");
//       window.location.reload();
//       // setFormData({ description: "", amount: "", type: "income" });
//     } catch (error) {
//       alert(error.data?.message || "Failed to add transaction");
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text("Expense Tracker - Transactions History", 14, 20);

//     const tableData = transactions.map((transaction, index) => [
//       index + 1,
//       transaction.description,
//       transaction.type,
//       `$${Number(transaction.amount)}`,
//       new Date(transaction.createdAt).toLocaleDateString(),
//     ]);

//     doc.autoTable({
//       head: [["#", "Description", "Type", "Amount", "Date"]],
//       body: tableData,
//     });

//     doc.save("ExpenseHistory.pdf");
//   };

//   const calculateTotal = (type) => {
//     return transactions
//       .filter((transaction) => transaction.type === type)
//       .reduce((sum, item) => sum + Number(item.amount), 0);
//   };

//   console.log(calculateTotal("income"));

//   return (
//     <div>
//       <div className="flex items-center justify-center h-full">
//         <div className="flex flex-col items-center justify-center">
//           <h1>Expense Tracker</h1>
//           <div>
//             <h3>Total Income: ${calculateTotal("income")}</h3>
//             <h3>Total Expense: ${calculateTotal("expense")}</h3>
//             <h3>
//               Net Balance: $
//               {calculateTotal("income") - calculateTotal("expense")}
//             </h3>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//             <input
//               type="number"
//               name="amount"
//               placeholder="Amount"
//               value={formData.amount}
//               onChange={handleChange}
//             />
//             <select name="type" value={formData.type} onChange={handleChange}>
//               <option value="income">Income</option>
//               <option value="expense">Expense</option>
//             </select>
//             <button type="submit">Add Transaction</button>
//           </form>

//           <button onClick={generatePDF}>Export as PDF</button>

//           <h2>Transaction History</h2>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Description</th>
//                 <th>Type</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction, index) => (
//                 <tr key={transaction._id}>
//                   <td>{index + 1}</td>
//                   <td>{transaction.description}</td>
//                   <td>{transaction.type}</td>
//                   <td>${transaction.amount}</td>
//                   <td>
//                     {new Date(transaction.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ExpenseTracker;


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
  const { data: transactions = [] } = useGetTransactionsQuery(
    loggedInUser?.user?.id
  );

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
      alert("Expense added successfully");
      window.location.reload();
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
      `$${Number(transaction.amount)}`,
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
      .reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const incomeTotal = calculateTotal("income");
  const expenseTotal = calculateTotal("expense");
  const balanceTotal = incomeTotal - expenseTotal;

  return (
    <div className="w-full min-h-[90vh] mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 overflow-y-auto">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2 pt-12">Expense Tracker</h1>
          <p className="text-md md:text-lg text-indigo-600">Manage your finances effectively</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Income</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">${incomeTotal.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Expense</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600">${expenseTotal.toFixed(2)}</p>
              </div>
              <div className="bg-red-100 p-2 md:p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Net Balance</p>
                <p className={`text-2xl md:text-3xl font-bold ${balanceTotal >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ${balanceTotal.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-indigo-800 mb-3 md:mb-4">Add New Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-3">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="e.g. Salary, Groceries"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-800 mb-2 md:mb-0">Transaction History</h2>
            <button
              onClick={generatePDF}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={transaction._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        ${Number(transaction.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                      No transactions found. Start by adding one above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;