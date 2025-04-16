import React from "react";
import { useGetUsersQuery } from "../redux/api/adminApi";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
    <p className="text-xl text-indigo-800">Loading users...</p>
  </div>;
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
      <p className="text-xl text-red-600">
        Error: {error.data?.message || "Failed to load users"}
      </p>
    </div>
  );

  const handleCheckExpense = (userId) => {
    navigate(`/admin/expense?userId=${userId}`);
  };

  return (
    <div className="w-full bg-gradient-to-br min-h-[90vh] mt-20 from-blue-50 to-indigo-100 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">All Registered Users</h1>
          <p className="text-md md:text-lg text-indigo-600">Manage user expenses</p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleCheckExpense(user._id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded-lg transition text-xs"
                      >
                        View Expenses
                      </button>
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

export default AllUsers;