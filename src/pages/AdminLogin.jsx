import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../redux/api/adminApi";

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [adminLog] = useAdminLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending Key:", secretKey); // Debugging
      const response = await adminLog(secretKey).unwrap();
      console.log("Response:", response); // Debugging

      localStorage.setItem("adminToken", response.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.data?.message || "Invalid Admin Key");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="password"
          placeholder="Enter Admin Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
