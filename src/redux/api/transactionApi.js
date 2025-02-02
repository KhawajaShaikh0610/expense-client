import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/transactions",
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (userId) => `/${userId}`,
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/",
        method: "POST",
        body: transaction,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useAddTransactionMutation } =
  transactionApi;
