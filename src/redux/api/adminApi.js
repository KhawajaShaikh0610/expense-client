import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (key) => ({
        url: "/login",
        method: "POST",
        body: { secretKey: key },
      }),
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUserExpenses: builder.query({
      query: (userId) => `/expenses?userId=${userId}`,
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetUsersQuery,
  useGetUserExpensesQuery,
} = adminApi;
