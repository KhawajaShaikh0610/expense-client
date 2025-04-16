// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { useGetUserExpensesQuery } from "../redux/api/adminApi";

// const AdminExpense = () => {
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get("userId");

//   const { data: expenses, error, isLoading } = useGetUserExpensesQuery(userId);

//   if (isLoading) return <p>Loading expenses...</p>;
//   if (error)
//     return (
//       <p style={{ color: "red" }}>
//         Error: {error.data?.message || "Failed to load expenses"}
//       </p>
//     );

//   // Calculate total income, total expense, and available cash based on "type"
//   const totalIncome =
//     expenses
//       ?.filter((expense) => expense.type === "income")
//       .reduce((acc, curr) => acc + curr.amount, 0) || 0;

//   const totalExpense =
//     expenses
//       ?.filter((expense) => expense.type === "expense")
//       .reduce((acc, curr) => acc + curr.amount, 0) || 0;

//   const totalAvailableCash = totalIncome - totalExpense;

//   return (
//     <div>
//       <h2>User Expenses</h2>

//       {/* Summary Section - Only Show When Data Exists */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "10px",
//           border: "1px solid black",
//           marginBottom: "10px",
//           background: "#f9f9f9",
//         }}
//       >
//         <p>
//           <strong>Total Available Cash:</strong> ${totalAvailableCash}
//         </p>
//         {totalIncome > 0 && (
//           <p>
//             <strong>Total Income:</strong> ${totalIncome}
//           </p>
//         )}
//         {totalExpense > 0 && (
//           <p>
//             <strong>Total Expense:</strong> ${totalExpense}
//           </p>
//         )}
//       </div>

//       {/* Expense Table */}
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Expense ID</th>
//             <th>Amount</th>
//             <th>Type</th>
//             <th>Description</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {expenses?.map((expense) => (
//             <tr key={expense._id}>
//               <td>{expense._id}</td>
//               <td>${expense.amount}</td>
//               <td
//                 style={{
//                   color: expense.type === "income" ? "green" : "red",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {expense.type}
//               </td>
//               <td>{expense.description}</td>
//               <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminExpense;


import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUserExpensesQuery } from "../redux/api/adminApi";

const AdminExpense = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data: expenses, error, isLoading } = useGetUserExpensesQuery(userId);

  if (isLoading) return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
    <p className="text-xl text-indigo-800">Loading expenses...</p>
  </div>;
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
      <p className="text-xl text-red-600">
        Error: {error.data?.message || "Failed to load expenses"}
      </p>
    </div>
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
    <div className="w-full bg-gradient-to-br min-h-[90vh] mt-20 from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">User Expenses</h1>
          <p className="text-md md:text-lg text-indigo-600">Detailed expense tracking</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Available Cash</p>
                <p className={`text-2xl md:text-3xl font-bold ${totalAvailableCash >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  ${totalAvailableCash.toFixed(2)}
                </p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          {totalIncome > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium">Total Income</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {totalExpense > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 border-l-8 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium">Total Expense</p>
                  <p className="text-2xl md:text-3xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
                </div>
                <div className="bg-red-100 p-2 md:p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 md:h-8 w-6 md:w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expense Table */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expense ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses?.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${expense.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${expense.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {expense.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExpense;